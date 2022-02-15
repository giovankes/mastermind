import remove_correct


def find_close(actual, guess):
    actual, guess = remove_correct(actual, guess)

    close = 0
    for possible in guess:
        del actual[actual.index(possible)]
        close += 1
    return close
