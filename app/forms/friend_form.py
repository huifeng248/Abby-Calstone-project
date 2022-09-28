from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, url, Length

class FriendForm(FlaskForm):
    accepted_status = BooleanField("Accept Status", default=False, validators=[DataRequired()])
    # user_a = IntegerField("UserA", validators=[DataRequired()])
    # user_id = IntegerField("UserA", validators=[DataRequired()])
    # friend_id = IntegerField("UserA", validators=[DataRequired()])

class FormValidation(FlaskForm):
    pass

