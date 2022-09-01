from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, url, Length

class PostForm(FlaskForm):
    url = StringField("Url", validators=[DataRequired(), url()])
    description = StringField("Description", validators=[Length(max=3000)])
    location = StringField("Location", validators=[Length(max=100)])
    show_stats = StringField("Show Status", default=True, validators=[DataRequired()])


class FormValidation(FlaskForm):
    pass