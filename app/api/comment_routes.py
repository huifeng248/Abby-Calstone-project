import json
from flask import Blueprint, jsonify, session, request, redirect, url_for
from sqlalchemy import delete
from app.models import User, db, Post, Comment, Friends, CommentsLikes
from flask_login import current_user, login_user, logout_user, login_required
from app.forms.comment_form import CommentForm, FormValidation

comment_routes = Blueprint('comments', __name__)

# update a comment
@comment_routes.route('/<id>', methods=['PUT'])
@login_required
def update_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    comment_to_update = Comment.query.get(id)
    if (not comment_to_update):
        result = {
            "message": "comment does not exist",
            "statusCode": 404
        }
        return jsonify(result)
    
    if (comment_to_update.user_id != current_user.id):
        result = {
            "message": "cannot update other's comment",
            "statusCode": 403
            }
        return jsonify(result)
    
    if form.validate_on_submit():
        comment_to_update.comment = form.data['comment']
        db.session.commit()
        comment_to_update = comment_to_update.to_dict()
        return jsonify(comment_to_update)
    else :
        return jsonify(form.errors) 

# delete a comment
@comment_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment = Comment.query.get(id)
    if (not comment):
        result = {
            "message": "comment does not exist",
            "statusCode": 404
            }
        return jsonify(result)
    if (comment.user_id != current_user.id):
        result = {
            "message": "cannot delete other's comment",
            "statusCode": 403
            }
        return jsonify(result)
    if form.validate_on_submit():
        db.session.delete(comment)
        db.session.commit()
        result = {
            "message": "Successfully deleted!"
        }
    return jsonify(result)


# like and unlike a post
@comment_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def add_remove_comment_like(id):
    form = FormValidation()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment = Comment.query.get(id)
        # if comment does not exit     
        if (not comment):
            result = {
            "message": "comment does not exist",
            "statusCode": 404
            }
            return jsonify(result)
        # if comment exit 
        comment = comment.to_dict()
        # post['user'] = User.query.get(post['user_id']).to_dict()
        current_user_id = current_user.id
        ## if current user likes the post, delete the likes
        for user in comment['user_comment_likes']:
            # print("_______", post['liked_user_ids'])
            if user['id'] == current_user_id:
                delete_comment_like = delete(CommentsLikes).where(
                    CommentsLikes.c.user_id == current_user_id,
                    CommentsLikes.c.comment_id == id
                )
                db.engine.execute(delete_comment_like)
                new_comment = Comment.query.get(id).to_dict()
                return jsonify(new_comment)
        
        ## if no likes, need to add the likes
        add_like = CommentsLikes.insert().values((current_user_id, id))
        db.engine.execute(add_like)
        new_comment = Comment.query.get(id).to_dict()
        return jsonify(new_comment)
    
    else:
        return jsonify(form.errors)