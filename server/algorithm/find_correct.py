def find_correct(actual, guess):
    return sum([1 for (a, b) in zip(actual, guess) if a == b])
