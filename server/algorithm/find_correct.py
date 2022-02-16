def find_correct(actual, guess, app):
    app.logger.info(actual)
    app.logger.info(guess)
    return sum([1 for (a, b) in zip(actual, guess) if a == b])
