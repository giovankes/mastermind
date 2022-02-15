def make_guess(pool, feedback):
    min_length = float("infinity")
    best_choice = None
    for possible in pool:
        length = len(list(filter_pool(pool, possible, feedback)))
        if min_length > length:
            min_length = length
            best_choice = possible
    return best_choice
