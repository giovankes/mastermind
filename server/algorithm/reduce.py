from algorithm.generate_initial_pool import generate_initial_pool
def reduce(choices, holes, pool, correct, close, tries, guess, app):
    if tries == 1:
        return generate_initial_pool(choices, holes)
    else:
        
