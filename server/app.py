from flask import Flask
from flask import request
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)


@app.route("/mastermind", methods=["POST"])
def index():
    app.logger.info("hello!")
    app.logger.info(request.json["code"])
    code_to_guess = request.json["code"]

    for i in code_to_guess:
        app.logger.info(i)
    return "yes"
