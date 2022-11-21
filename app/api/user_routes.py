from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from app.forms.search_form import SearchForm
from sqlalchemy import and_, or_
from urllib.parse import parse_qs

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# search user by name
@user_routes.route('/search', methods=['POST'])
@login_required
def search_users():

    
    query_paras = request.query_string.decode("utf-8")
    query_data= parse_qs(query_paras)
    
    

    users = User.query.filter(or_(User.first_name.like(f"%{query_data['searchItem'][0]}%"), 
                                    User.last_name.like(f"%{query_data['searchItem'][0]}%"),
                                    User.username.like(f"%{query_data['searchItem'][0]}%")
                                    ))
    return (jsonify([user.to_dict() for user in users]))
    
    # this does not require form as just a string
    # form = SearchForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # user_name = form.data['search_content']
    # if form.validate_on_submit():

    #     users = User.query.filter(or_(User.first_name.like(f"%{user_name}%"), 
    #                                   User.last_name.like(f"%{user_name}%"),
    #                                   User.username.like(f"%{user_name}%")
    #                                   ))
    #     return {'users': [user.to_dict() for user in users]}