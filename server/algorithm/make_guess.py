from algorithm.filter_pool import filter_pool


def make_guess(pool, feedback, Feedback, app):
    min_length = float("infinity")
    best_choice = None
    for possible in pool:
        length = len(list(filter_pool(pool, possible, feedback, Feedback, app)))
        if min_length > length:
            min_length = length
            best_choice = possible
    return best_choice
