from .db import db
from sqlalchemy.sql import func
from datetime import datetime, timezone, timedelta
from .posts_likes import Postslikes



class Post (db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    url = db.Column(db.String, nullable=False)
    description = db.Column(db.String(3000), nullable=True)
    location = db.Column(db.String(100), nullable=True)
    show_stats = db.Column(db.Boolean, nullable=False, default=True)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    user = db.relationship("User", back_populates="posts")
    user_post_likes = db.relationship(
    "User",
    secondary=Postslikes,
    back_populates="posts_likes"
    )
    
    comments = db.relationship("Comment", back_populates="post", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "url": self.url,
            "description": self.description,
            "location": self.location,
            "show_stats": self.show_stats,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "comments": [comment.to_dict() for comment in self.comments],
            "user_post_likes": len(self.user_post_likes),
            "liked_user_ids": [{'id':user.id, 'username':user.username, 'last_name':user.last_name, 'first_name':user.first_name, 'profile_img':user.profile_img} for user in self.user_post_likes] 
        }