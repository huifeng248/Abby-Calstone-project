from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

# the user_id and post_id is just a way to pass the validation of flask form
# the actual data is filled in the backend route from the current_user and params for the post id
class CommentForm(FlaskForm):
    comment= StringField("Comment", 
        validators=[DataRequired(), 
        Length(max=1000, min=1, message='Comment must between 1 to 1000 characters')]
        )
    user_id= IntegerField(validators=[DataRequired()])
    post_id= IntegerField(validators=[DataRequired()])

class FormValidation(FlaskForm):
    pass