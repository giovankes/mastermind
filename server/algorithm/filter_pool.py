from algorithm.is_match import is_match


def filter_pool(pool, guess, feedback, Feedback):
    for possible in pool:
        if is_match(guess, feedback, possible, Feedback) and (possible != guess):
            yield possible
