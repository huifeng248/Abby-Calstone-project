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
    return jsonify(posts_to_json)


    



