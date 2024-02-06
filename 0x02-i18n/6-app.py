#!/usr/bin/env python3
""" Basic Flask app """

from flask import Flask, render_template, request, g
from flask_babel import Babel
import pytz


class Config:
    """Language config class"""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app, default_timezone="UTC")
app.config.from_object(Config)


# mock data for users table
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """get user by using id"""
    user_id = request.args.get("login_as", None)
    if user_id is None:
        return None
    return users.get(int(user_id), None)


@app.before_request
def before_request():
    """update current user"""
    g.user = get_user()


# locale selector
@babel.localeselector
def get_locale():
    """babel locale selector"""
    valid_locales = app.config["LANGUAGES"]
    locale = request.args.get("locale")
    if locale in valid_locales:
        return locale
    if g.user:
        if g.user.get("locale") in valid_locales:
            return g.user.get("locale")

    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/", strict_slashes=False)
def home():
    """home page route"""
    return render_template("6-index.html", user=g.user)
