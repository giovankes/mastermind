from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/")
def index():
    return "Server Works"


@app.route("/greet")
def say_hello():
    return "Hello from server"


@app.route("/post-data", methods=["POST"])
def post_data():
    received_data = request.json
