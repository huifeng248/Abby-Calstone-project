

from sqlalchemy import delete
from flask import Blueprint, jsonify, session, request, redirect, url_for
from app.models import User, db, Post, Comment, Friends
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.post_form import PostForm, FormValidation
from app.forms.comment_form import CommentForm
# from app.models import Imageslikes

post_routes = Blueprint('posts', __name__)

# homepage get posts
@post_routes.route('')
@login_required
def get_posts_at_homepage():
    id = current_user.id
    #get the friends for the current user by filtering userId
    friend_obj_list = Friends.query.filter(Friends.user_id == id).all()
    friend_arr_list = [friend.friend_id for friend in friend_obj_list]
    #append userid into that list
    friend_arr_list.append(id)
    posts = Post.query.filter(Post.user_id.in_(friend_arr_list)).order_by(
        Post.createdAt.desc()).all()
    posts_to_json= [post.to_dict() for post in posts]
    post_userId = [post.user_id for post in posts]
    for post in posts_to_json:
        # for every post, include the post user info
        post['user'] = User.query.get(post['user_id']).to_dict()
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                post['current_user_like'] = True
            else:
                post['current_user_like'] = False
    return jsonify(posts_to_json)


# get post by post id
@post_routes.route('/<id>')
@login_required
def get_post_by_post_id(id):
    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    else: 
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
    for post in posts_to_json:
        # for every post, include the post user info
        post['user'] = User.query.get(post['user_id']).to_dict()
        for user in post["liked_user_ids"]:
            if user['id'] == current_user.id:
                post['current_user_like'] = True
                # print("$$$$$$$$", post['id'], post['current_user_like'], post['description'])
            else:
                post['current_user_like'] = False
    return jsonify(posts_to_json)

# create a post 
@post_routes.route('/new', methods=['POST'])
@login_required
def add_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post = Post(
            user_id = current_user.id,
            url = form.data['url'],
            description = form.data['description'],
            location = form.data['location'],
            show_stats = form.data['show_stats']
        )
        db.session.add(post)
        db.session.commit()
        post = post.to_dict()
        post['user'] = User.query.get(current_user.id).to_dict()
        return post
    else:
        return jsonify(form.errors)

#update a post 
@post_routes.route('/<id>', methods=['PUT'])
@login_required
def update_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    if (post.user_id != current_user.id):
        result = {
            "message": "cannot edit other's post",
            "statusCode": 403
            }
        return jsonify(result)
    if form.validate_on_submit():
        post.url = form.data['url']
        post.description = form.data['description']
        post.location = form.data['location']
        post.show_stats = form.data['show_stats']
        db.session.commit()
        post = post.to_dict()
        post['user'] = User.query.get(current_user.id).to_dict()
        return jsonify(post)
    else:
        return jsonify(form.errors)


#delete a post 
@post_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_post(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    if (post.user_id != current_user.id):
        result = {
            "message": "cannot delete other's post",
            "statusCode": 403
            }
        return jsonify(result)
    if form.validate_on_submit():
        db.session.delete(post)
        db.session.commit()
        result = {
            "message": "Successfully deleted!"
        }
        return jsonify(result)
    
# get comment for a post

# create a comment on a given post 
@post_routes.route('/<id>/comments/new', methods=['POST'])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post = Post.query.get(id)
    if (not post):
        result = {
            "message": "post does not exist",
            "statusCode": 404
        }
        return jsonify(result)
    
    
    if form.validate_on_submit():
        comment = Comment(
            user_id = current_user.id,
            comment = form.data['comment'],
            post_id = id
        )
        db.session.add(comment)
        db.session.commit()
        comment = comment.to_dict()
        return jsonify(comment)
    else :
        return jsonify(form.errors)




    