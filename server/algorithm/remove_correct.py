def remove_correct(actual, guess):
    actual2 = [a for (a, b) in zip(actual, guess) if a != b]
    guess2 = [b for (a, b) in zip(actual, guess) if a != b]
    return actual2, guess2
