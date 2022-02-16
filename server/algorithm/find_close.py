from algorithm.remove_correct import remove_correct


def find_close(actual, guess, app):
    actual, guess = remove_correct(actual, guess, app)

    close = 0
    for possible in guess:
        if possible in actual:
            del actual[actual.index(possible)]
            close += 1
    return close
