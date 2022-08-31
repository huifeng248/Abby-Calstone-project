from urllib import request
from xmlrpc.client import Boolean
from .db import db

# Friends = db.Table(
#     "friends",
#     db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("friend_id", db.Integer, db.ForeignKey("users.id")),
#     db.Column("accepted_status", db.Boolean)
# )


class Friends(db.Model):
    __tablename__ = "friends"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    accepted_status = db.Column(db.Boolean, default=False)

    accepter = db.relationship("User",
        foreign_keys=[user_id],
        back_populates="accept_user")

    requester = db.relationship("User",
        foreign_keys=[friend_id],
        back_populates="request_user")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "friend_id": self.friend_id,
            "accepted_status": self.accepted_status
        }