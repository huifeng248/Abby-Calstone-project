from .db import db
from .comments_likes import CommentsLikes
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    comment = db.Column(db.String(1000), nullable=False)
    createdAt = db.Column(db.DateTime(timezone=True), nullable=True, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True), nullable=True, onupdate=func.now())

    post = db.relationship("Post", back_populates="comments")

    user = db.relationship("User", back_populates="comments")
    user_comment_likes = db.relationship(
    "User",
    secondary=CommentsLikes,
    back_populates="comments_likes",
    )