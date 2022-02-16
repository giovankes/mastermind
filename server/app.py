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
    holes = request.json["holes"]
    choices = request.json["colors"]
    code_to_guess = request.json["code"]
    pool = generate_initial_pool(choices, holes)
    guess = list([0 if (i < (holes / 2)) else 1 for i in range(holes)])

    lst_to_tuple = tuple(i for i in guess)

    # BUG: can't have a while loop as every request is a new function call.
    # BUG: so i'll have to re-generate the pool on the new choices and holes? i guess
    while True:
        app.logger.info("lol !")
        app.logger.info(f"try this: {guess}")

    return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
