# NOTE: flask modules
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from tinydb import TinyDB, Query
from tinydb.operations import delete

# NOTE: python modules
import logging
import random
import itertools
import collections
import json

# NOTE: my functions
from algorithm.generate_initial_pool import generate_initial_pool

app = Flask(__name__)
CORS(app)

def bogosort():


@app.route("/mastermind", methods=["POST"])
def index():
    holes = request.json["holes"]
    choices = request.json["colors"]
    code_client = request.json["code"]
    tries = request.json["tries"]
    algorithm = request.json["algorithm"]
    code = list()
    for i in code_client:
        # NOTE: VERY VERY DISGUSTING IF ELSE BUT I HAVE NO OTHER CHOICE
        if i["value"] == "zero":
            code.append(0)
        elif i["value"] == "one":
            code.append(1)
        elif i["value"] == "two":
            code.append(2)
        elif i["value"] == "three":
            code.append(3)
        elif i["value"] == "four":
            code.append(4)
        elif i["value"] == "five":
            code.append(5)

    code = convert(code)
    initial_pool = generate_initial_pool(choices, holes)
    gepakt = False
    initial_guess = random.choice(initial_pool)
    initial_pool_score = evaluate(initial_guess, code)
    possibleCodes = reduce(initial_pool, initial_guess, initial_pool_score)
    guesses = list()
    guesses.append(initial_guess)
    while gepakt != True:
        guess = possibleCodes[0]
        score = evaluate(guess, code)
        possibleCodes = reduce(possibleCodes, guess, score)
        guesses.append(guess)
        if guess == code:
            app.logger.info("hoppa")
            gepakt = True
    app.logger.info(guesses)
    return jsonify(guess=guesses)


def convert(code):
    return tuple(i for i in code)


def evaluate(guess, secret):
    score = [0, 0]
    used = []
    for position in range(len(guess)):
        if guess[position] == secret[position]:
            score[0] += 1
            used.append(position)
    secretCopy = list(secret[::])
    for position in used:
        secretCopy.remove(secret[position])
    for i in range(len(guess)):
        if i not in used:
            if guess[i] in secretCopy:
                score[1] += 1
                secretCopy.remove(guess[i])
    return score


def reduce(possibleCodes, guess, score):
    result = []
    for possibleCode in possibleCodes:
        if score == evaluate(guess, possibleCode):
            result.append(possibleCode)

    return result


if __name__ == "__main__":
    app.run(debug=True)
