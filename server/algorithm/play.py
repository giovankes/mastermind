def play():
    '''Plays a complete game of mastermind, and collects user input.'''
    choices = int(raw_input("Number of numbers? "), 10)
    holes = int(raw_input("Number of spaces?  "), 10)
    print ''

    pool = generate_initial_pool(choices, holes)
    guess = [0 if (i < (holes / 2)) else 1 for i in range(holes)]
    while True:
        print "Try this: {0}".format(guess)
        correct = int(raw_input("    # Red pegs?   "))
        close = int(raw_input("    # White pegs? "))

        feedback = Feedback(correct, close)
        if feedback.correct == holes:
            break
        pool = list(filter_pool(pool, guess, feedback))
        print "{0} possible choices left. Thinking...\n".format(len(pool))

        guess = make_guess(pool, feedback)
    print "\nYou win!"


if __name__ == '__main__':
    play()
