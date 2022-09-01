from email import message
from pickle import FALSE
from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Post, Comment, Friends
from flask_login import current_user, login_user, logout_user, login_required
# from app.forms.image_form import ImageForm, DeleteImageForm, FormValidation
# from app.forms.comment_form import CommentForm
# from app.models import Imageslikes

post_routes = Blueprint('posts', __name__)

# homepage get posts
@post_routes.route('')
@login_required
def get_posts_at_homepage():
    id = current_user.id
    print("!!!!", id)
    #get the friends for the current user by filtering userId
    friend_obj_list = Friends.query.filter(Friends.user_id == id).all()
    # print ("!!!!!!!!!!!!!!", friend_obj_list)
    friend_arr_list = [friend.friend_id for friend in friend_obj_list]
    #append userid into that list
    friend_arr_list.append(id)
    # print ("!!!!!!!!!!!!!!", friend_arr_list)
    posts = Post.query.filter(Post.user_id.in_(friend_arr_list)).order_by(Post.createdAt.desc()).all()
    posts_to_json= [post.to_dict() for post in posts]
    post_userId = [post.user_id for post in posts]
    # print("!!!!!!!!", post_userId)
    for post in posts_to_json:
        # for every post, include the post user info
        post['post_user'] = User.query.get(post['user_id']).to_dict()
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                # print("!!!!!!!!!!", user['id'], current_user.id)
                post['current_user_like'] = True
                # print("$$$$$$$$", post['id'], post['current_user_like'], post['description'])
            else:
                post['current_user_like'] = False
    return jsonify(posts_to_json)


# get post by post id
@post_routes.route('/<id>')
@login_required
def get_post_by_post_id(id):
    post = Post.query.get(id)
    post_to_json = post.to_dict()
    return jsonify(post_to_json)

# get post by user id, get all posts of a certain user 
@post_routes.route('users/<id>')
@login_required
def get_all_posts_by_userid(id):
    user = User.query.get(id)
    if (not user):
        result = {
            "message": "user not exist",
            "statusCode": 404
        }
        return result
    posts = Post.query.filter(Post.user_id == id).order_by(Post.createdAt.desc()).all()
    if (not len(posts)):
        result = {
            "message": "user does not have any post yet",
            "statusCode": 404
        }
        return result

    posts_to_json= [post.to_dict() for post in posts]
    post_userId = [post.user_id for post in posts]
    # print("!!!!!!!!", post_userId)
    for post in posts_to_json:
        # for every post, include the post user info
        post['post_user'] = User.query.get(post['user_id']).to_dict()
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                # print("!!!!!!!!!!", user['id'], current_user.id)
                post['current_user_like'] = True
                # print("$$$$$$$$", post['id'], post['current_user_like'], post['description'])
            else:
                post['current_user_like'] = False
    return jsonify(posts_to_json)

# create a post 
@post_routes.route('/new')
@login_required


#update a post 




#delete a post 


    



