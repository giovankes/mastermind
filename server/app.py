# NOTE: flask modules
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS

# NOTE: python modules
import logging
import random
import itertools
import collections

# NOTE: my functions
from algorithm.generate_initial_pool import generate_initial_pool
from algorithm.reduce import reduce

Feedback = collections.namedtuple("Feedback", ["correct", "close"])

app = Flask(__name__)
CORS(app)

pool = generate_initial_pool(choices, holes)


@app.route("/mastermind", methods=["POST"])
def index():
    holes = request.json["holes"]
    choices = request.json["colors"]
    correct_pegs = request.json["correct"]
    close = request.json["close"]
    code = request.json["code"]
    tries = request.json["tries"]
    app.logger.info(pool)
    feedback = Feedback(correct_pegs, close)
    guess = random.choice(pool)

    if tries > 1:
        pool = reduce(pool, correct_pegs, close, guess, app)

    lst_to_tuple = tuple(i for i in guess)

    return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
