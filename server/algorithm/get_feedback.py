from algorithm.find_correct import find_correct
from algorithm.find_close import find_close


def get_feedback(actual, guess, Feedback, app):
    return Feedback(find_correct(actual, guess, app), find_close(actual, guess, app))
