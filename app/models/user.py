from time import timezone
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from .posts_likes import Postslikes
from .comments_likes import CommentsLikes
from .friends import Friends


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.Integer, nullable=True, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    birthday = db.Column(db.DateTime(timezone=True), nullable=True)
    gender = db.Column(db.String(50), nullable=True)
    hashed_password = db.Column(db.String, nullable=False)
    profile_img = db.Column(db.String(1000), nullable=True, default='https://freesvg.org/img/abstract-user-flat-4.png')
    website = db.Column(db.String(64), nullable=True)
    bio = db.Column(db.String(150), nullable=True)
    public = db.Column(db.Boolean, nullable=False, default=True)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    posts = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")

    posts_likes = db.relationship(
    "Post",
    secondary=Postslikes,
    back_populates="user_post_likes",
    )

    comments = db.relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    comments_likes = db.relationship(
    "Comment",
    secondary=CommentsLikes,
    back_populates="user_comment_likes",
    )

    # friends = db.relationship(
    # "User",
    # secondary=Friends,
    # primaryjoin=(Friends.c.user_id == id),
    # secondaryjoin=(Friends.c.friend_id == id),
    # backref=db.backref("Friends", lazy="dynamic"),
    # lazy="dynamic"
    # )

    accept_user = db.relationship("Friends",
        foreign_keys='Friends.user_id',
        back_populates="accepter",
        lazy='dynamic')

    request_user = db.relationship("Friends",
        foreign_keys='Friends.friend_id',
        back_populates="requester",
        lazy='dynamic')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'email': self.email,
            'birthday': self.birthday,
            'gender': self.gender,
            'profile_img': self.profile_img,
            'website': self.website,
            'bio': self.bio,
            'public': self.public
        }
