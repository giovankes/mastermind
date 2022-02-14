from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import logging
import random

app = Flask(__name__)
CORS(app)


@app.route("/mastermind", methods=["POST"])
def index():
    app.logger.info("hello!")
    app.logger.info(request.json["code"])
    code_to_guess = request.json["code"]
    guess = list()
    for i in code_to_guess:
        app.logger.info(i)
        random_number = random.randint(0, 4)
        guess.append(random_number)

    lst_to_tuple = tuple(i for i in guess)

    return jsonify(guess=lst_to_tuple)
