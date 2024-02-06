#!/usr/bin/env python3
""" Basic Flask app """

from flask import Flask, render_template, request
from flask_babel import Babel, gettext as _


class Config:
    """Language config class"""

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
babel = Babel(app, default_timezone="UTC")
app.config.from_object(Config)


# locale selector
@babel.localeselector
def get_locale():
    """babel locale selector"""
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route("/", strict_slashes=False)
def home():
    """home page route"""
    data = {"home_title": _("Welcome to Holberton"),
            "home_header": _("Hello world!")}

    return render_template("3-index.html", **data)


if __name__ == "__main__":
    app.run(debug=True)
