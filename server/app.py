from flask import Flask
from flask import request
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)


@app.route("/mastermind", methods=["POST"])
def index():
    app.logger.info("hallo")
    app.logger.info(request.json)
    return "yes"
