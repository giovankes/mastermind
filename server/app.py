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
from algorithm.filter_pool import filter_pool
from algorithm.make_guess import make_guess

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
    tries = int(request.json["tries"])
    feedback = Feedback(correct_pegs, close)
    guess = [0 if (i < (holes / 2)) else 1 for i in range(holes)]
    # BUG: can't have a while loop as every request is a new function call.
    # BUG: so i'll have to re-generate the pool on the new choices and holes? i guess
    if tries > 1:
        if feedback.correct == holes:
            return

        pool = generate_initial_pool(choices, holes)
        app.logger.info(pool)
        return jsonify(guess=lst_to_tuple)
    else:
        # NOTE: first guess
        lst_to_tuple = tuple(i for i in guess)

        return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
