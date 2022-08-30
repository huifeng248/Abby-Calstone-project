from xmlrpc.client import Boolean
from .db import db

Friends = db.Table(
    "friends",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("friend_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("accepted_status", db.Boolean)
)