import itertools


def generate_initial_pool(choices, holes):
    return list(itertools.product(*[range(choices) for _ in range(holes)]))
