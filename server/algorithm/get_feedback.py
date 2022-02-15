from find_correct import find_correct
from find_close import find_close


def get_feedback(actual, guess, Feedback):
    return Feedback(find_correct(actual, guess), find_close(actual, guess))
