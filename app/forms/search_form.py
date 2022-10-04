from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, url, Length

class SearchForm(FlaskForm):
    search_content = StringField("Search Content", validators=[DataRequired()])


class FormValidation(FlaskForm):
    pass