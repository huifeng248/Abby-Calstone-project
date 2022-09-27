from flask import Blueprint, jsonify,request
from flask_login import login_required, current_user
from app.models import Friends, User, db
from app.forms.post_form import FormValidation
from sqlalchemy import and_, or_

friend_routes = Blueprint('friends', __name__)

# get a list of friends that user has received request from
@friend_routes.route('/receive')
@login_required
def receive_all_incoming_friends():
    current_user_id = current_user.id
    friends = Friends.query.filter(Friends.user_id == current_user_id, Friends.accepted_status == False)
    friends_to_json = [friend.to_dict() for friend in friends]
    for friend_pair in friends_to_json:
        friend_pair['friend_detail'] = User.query.get(friend_pair['friend_id']).to_dict()
    return jsonify(friends_to_json)

# get a list of friends that user has sent request
@friend_routes.route('/request')
@login_required
def get_all_requested_friends():
    current_user_id = current_user.id
    friends = Friends.query.filter(Friends.friend_id == current_user_id, Friends.accepted_status == False)
    friends_to_json = [friend.to_dict() for friend in friends]
    for friend_pair in friends_to_json:
        friend_pair['friend_detail'] = User.query.get(friend_pair['friend_id']).to_dict()
    return jsonify(friends_to_json)




# get mutual friends
@friend_routes.route('')
@login_required
def get_all_friends():
    current_user_id = current_user.id
    friends = Friends.query.filter(or_ (Friends.user_id == current_user_id, Friends.friend_id == current_user_id,), Friends.accepted_status == True)
    friends_to_json = [friend.to_dict() for friend in friends]
    for friend_pair in friends_to_json:
        friend_pair['friend_detail'] = User.query.get(friend_pair['friend_id']).to_dict()
    return jsonify(friends_to_json)

# send friend request 
# parameter id is friend_id  ## requester is friend_id, accepter is the user_id
@friend_routes.route('/<id>', methods=['POST'])
@login_required
def send_friend_request(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    friend = User.query.get(id)

    # this check if they are already friend or a friend request is already send
    request_friends = Friends.query.filter(or_(and_(Friends.user_id == id, Friends.friend_id == current_user.id),
        and_(Friends.friend_id == id, Friends.user_id == current_user.id))).all()


    request_friends_to_json = [friend.to_dict() for friend in request_friends]
    # return jsonify(request_friends_to_json)
    if (not friend):
        result = {
            "message": "user does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    elif (len(request_friends_to_json)):
        result = {
            "message": "friend request is already sent, or is already friends",
            "statusCode": 403
            }
        return jsonify(result)
    else: 
        if form.validate_on_submit():
            friendship = Friends(
                # the one send the request is the friend id
                friend_id = current_user.id,
                accepted_status = False,
                # the user_id is the one that would accept the request
                user_id = id
            )
            db.session.add(friendship)
            db.session.commit()
            friendship = friendship.to_dict()
            friendship['friend_detail'] = User.query.get(friendship['friend_id']).to_dict()
            return jsonify(friendship)
        else:
            return jsonify(form.errors)


# delete friend
# 1) reject friend request and 2) un-friend a friend and 3) cancel the sending request
# this need fix tomorrow need to seperate the senarios: as the direction is multiple

# the id is the friend id.
@friend_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_friend_request(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    friend = User.query.get(id)
    request_friends = Friends.query.filter(or_(and_(Friends.friend_id == id, Friends.user_id == current_user.id), 
        and_(Friends.friend_id == current_user.id, Friends.user_id == id)))
    request_friends_to_json = [friend.to_dict() for friend in request_friends]

    if (not friend):
        result = {
            "message": "user does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    elif (not len(request_friends_to_json)):
        result = {
            "message": "friendship does not exit",
            "statusCode": 403
            }
        return jsonify(result)
    else: 
        if form.validate_on_submit():
            # query to get the frienship id and get the specific one to delete it.
            friendship_id = request_friends_to_json[0]["id"]
            friendship = Friends.query.get(friendship_id)

            db.session.delete(friendship)
            db.session.commit()
            result = {
                "message": "Successfully deleted!"
            }
            return jsonify(result)
        else:
            return jsonify(form.errors)


# accept friend request: change the status to true
# the id is the friend id.
@friend_routes.route('/<id>', methods=['PUT'])
@login_required
def accept_friend_request(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    friend = User.query.get(id)
    request_friends = Friends.query.filter(Friends.user_id == current_user.id, Friends.friend_id == id)
    request_friends_to_json = [friend.to_dict() for friend in request_friends]

    if (not friend):
        result = {
            "message": "user does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    elif (not len(request_friends_to_json)):
        result = {
            "message": "friendship does not exit",
            "statusCode": 403
            }
        return jsonify(result)
    else: 
        if form.validate_on_submit():
            friendship_id = request_friends_to_json[0]["id"]
            friendship = Friends.query.get(friendship_id)
            friendship.accepted_status = True
            db.session.commit()
            friendship = friendship.to_dict()
            return jsonify(friendship)
        else:
            return jsonify(form.errors)


