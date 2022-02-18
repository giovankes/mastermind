from algorithm.generate_initial_pool import generate_initial_pool


def reduce(choices, holes, tries, pool, correct, close, guess, app):
    if tries == 1:
        return generate_initial_pool(choices, holes)
    else:
        app.logger.info("lol")
