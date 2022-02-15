from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import logging
import random
import itertools
import collections


Feedback = collections.namedtuple("Feedback", ["correct", "close"])


def generate_initial_pool(choices, holes):
    return list(itertools.product(*[range(choices) for _ in xrange(holes)]))


app = Flask(__name__)
CORS(app)


@app.route("/mastermind", methods=["POST"])
def index():
    app.logger.info(request.json["code"])
    code_to_guess = request.json["code"]
    guess = list()
    for i in code_to_guess:
        app.logger.info(i)
        random_number = random.randint(0, 4)
        guess.append(random_number)

    lst_to_tuple = tuple(i for i in guess)

    return jsonify(guess=lst_to_tuple)


if __name__ == "__main__":
    app.run(debug=True)
