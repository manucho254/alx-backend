#!/usr/bin/env python3
""" Basic Flask app """

from flask import Flask, render_template, request
from flask_babel import Babel


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
    return render_template("2-index.html")


if __name__ == "__main__":
    app.run(debug=True)
