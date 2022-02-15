def filter_pool(pool, gues, feedback):
    for possible in pool:
        if is_match(guess, feedback, possible) and (possible != guess):
            yield possible
