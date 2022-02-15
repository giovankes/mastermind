def get_feedback(actual, guess, Feedback):
    return Feedback(find_correct(actual, guess), find_close(actual, guess))
