from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from algorithm.generate_initial_pool import generate_initial_pool
import logging
import random
import itertools
import collections


Feedback = collections.namedtuple("Feedback", ["correct", "close"])

app = Flask(__name__)
CORS(app)


@app.route("/mastermind", methods=["POST"])
def index():
    app.logger.info(request.json["code"])
    app.logger.info(request.json["holes"])
    holes = request.json["holes"]
    code_to_guess = request.json["code"]
    guess = list()

    lst_to_tuple = tuple(i for i in guess)

    return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
