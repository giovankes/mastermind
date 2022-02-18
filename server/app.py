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


@app.route("/mastermind", methods=["POST"])
def index():
    holes = request.json["holes"]
    choices = request.json["colors"]
    correct_pegs = request.json["correct"]
    close = request.json["close"]
    code = request.json["code"]
    tries = request.json["tries"]
    feedback = Feedback(correct_pegs, close)

    pool = reduce(choices, holes, tries, pool, correct_pegs, close, guess, app)
    guess = random.choice(pool)

    app.logger.info(pool)
    lst_to_tuple = tuple(i for i in guess)

    return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
