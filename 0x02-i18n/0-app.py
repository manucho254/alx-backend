#!/usr/bin/python3
""" Basic Flask app """

from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    """home page route"""
    return render_template("0-index.html")