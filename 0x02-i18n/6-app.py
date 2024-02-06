#!/usr/bin/env python3
""" Basic Flask app """

from flask import Flask, render_template, request, g
from flask_babel import Babel
from typing import Dict


class Config:
    """Language config class"""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# mock data for users table
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


app = Flask(__name__)
babel = Babel(app, default_timezone="UTC")
app.config.from_object(Config)


def get_user() -> Dict | None:
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
    if request.args.get("locale") in valid_locales:
        return request.args.get("locale")
    if g.user is not None:
        if g.user["locale"] in valid_locales:
            return g.user["locale"]
    if request.headers.get("Accept-Language").split(",")[1][0:2] \
        in valid_locales:
        request.headers.get("Accept-Language").split(",")[1][0:2]

    return request.accept_languages.best_match(app.config["LANGUAGES"])

@app.route("/", strict_slashes=False)
def home():
    """home page route"""
    return render_template("5-index.html", user=g.user)
