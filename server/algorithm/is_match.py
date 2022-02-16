from algorithm.get_feedback import get_feedback


def is_match(guess, feedback, possible, Feedback, app):
    return feedback == get_feedback(possible, guess, Feedback, app)
