import itertools


def generate_initial_pool(choices, holes):
    return list(itertools.producs(*[range(choices) for _ in xrange(holes)]))
