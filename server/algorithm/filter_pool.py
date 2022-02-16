from algorithm.is_match import is_match
import logging


def filter_pool(pool, guess, feedback, Feedback, app):
    for possible in pool:
        if is_match(guess, feedback, possible, Feedback, app) and (possible != guess):
            yield possible
