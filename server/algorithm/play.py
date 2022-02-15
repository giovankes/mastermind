from generate_initial_pool import generate_initial_pool
from filter_pool import filter_pool
from make_guess import make_guess
import collections

Feedback = collections.namedtuple("Feedback", ["correct", "close"])


def play():
    """Plays a complete game of mastermind, and collects user input."""
    choices = int(input("Number of numbers? "), 10)
    holes = int(input("Number of spaces?  "), 10)
    print("")

    pool = generate_initial_pool(choices, holes)
    guess = [0 if (i < (holes / 2)) else 1 for i in range(holes)]
    while True:
        print("lmao")
        print("Try this: {0}".format(guess))
        correct = int(input("    # Red pegs?   "))
        close = int(input("    # White pegs? "))

        feedback = Feedback(correct, close)
        if feedback.correct == holes:
            break

        pool = list(filter_pool(pool, guess, feedback, Feedback))
        print(len(pool))
        guess = make_guess(pool, feedback)
    print("\nYou win!")


if __name__ == "__main__":
    play()
