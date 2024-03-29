import React from 'react';
import classNames from 'classnames';
import axios from 'axios';

let times = (n) => {
  return (f) => {
    Array(n)
      .fill()
      .map((_, i) => f(i));
  };
};

const Rules = React.createClass({
  render: function () {
    const className = classNames({
      info: true,
      hidden: !this.props.rules,
    });
    const infoText = !this.props.rules ? 'Show rules' : 'Hide rules';

    return (
      <div className="rules">
        <span className="rules-toggle" onClick={this.props.toggleRules}>
          {infoText}
        </span>
        <p className={className}>
          Try to guess the pattern, in both order and color, within ten turns. After
          submitting a row, a small black peg is placed for each code peg from the guess
          which is correct in both color and position. A white peg indicates the existence
          of a correct color code peg placed in the wrong position. More info on{' '}
          <a href="https://en.wikipedia.org/wiki/Mastermind_(board_game)" target="_blank">
            Wikipedia
          </a>
          .
        </p>
      </div>
    );
  },
});

const Peg = React.createClass({
  render: function () {
    return (
      <span className={this.props.pegClass}>
        <input
          type="radio"
          name={this.props.name}
          value={this.props.value}
          id={this.props.idVal}
          onClick={this.props.isCurrentRow ? this.props.activatePeg : null}
        />
        <label htmlFor={this.props.idVal}></label>
      </span>
    );
  },
});

const DecodeRow = React.createClass({
  //do not update already submitted row
  shouldComponentUpdate: function (nextProps) {
    return nextProps.state.currentRow <= nextProps.rowId;
  },

  render: function () {
    let pegs = [];
    let idVal;
    let pegClass;

    let generatePeg = (i) => {
      idVal = this.props.name + '-' + i + 1;
      //update current row
      if (this.props.state.currentRow === this.props.rowId) {
        pegClass = this.props.state.currentGuess.get(i)
          ? 'peg ' + this.props.state.currentGuess.get(i)
          : 'peg';
      } else {
        //clear all of the next pegs - from the previous game
        pegClass = 'peg';
      }

      pegs.push(
        <Peg
          state={this.props.state}
          idVal={idVal}
          name={this.props.name}
          value={i + 1}
          key={idVal}
          pegClass={pegClass}
          isCurrentRow={this.props.isCurrentRow}
          activatePeg={this.props.activatePeg}
        />,
      );
    };

    times(this.props.state.pegsInRow)(generatePeg);
    return <div className="decode-row">{pegs}</div>;
  },
});

const SubmitButton = React.createClass({
  render: function () {
    const className = classNames({
      submit: true,
      hidden: !(
        this.props.state.currentGuess.size >= this.props.state.pegsInRow &&
        this.props.state.currentRow === this.props.rowId
      ),
    });
    return <button className={className} onClick={this.props.submitPegs}></button>;
  },
});

const Row = React.createClass({
  render: function () {
    const isCurrentRow = this.props.state.currentRow === this.props.rowId;
    const rowClassName = classNames({
      row: true,
      clearfix: true,
      current: isCurrentRow,
    });
    const hintsRowName = 'hintsRow-' + this.props.rowId;
    const rowName = 'decodeRow-' + this.props.rowId;
    return (
      <div className={rowClassName}>
        <div className="left">
          <DecodeRow
            submitPegs={this.props.submitPegs}
            name={rowName}
            key={this.props.rowId}
            rowId={this.props.rowId}
            state={this.props.state}
            isCurrentRow={isCurrentRow}
            activatePeg={this.props.activatePeg}
          />
        </div>
        <div className="left">
          <SubmitButton
            chosenCode={this.props.chosenCode}
            creatingCode={this.props.state.creatingCode}
            rowId={this.props.rowId}
            state={this.props.state}
            submitPegs={this.props.submitPegs}
          />
        </div>
        {this.props.state.creatingCode !== true && (
          <div className="right">
            <HintsRow
              name={hintsRowName}
              key={this.props.rowId}
              rowId={this.props.rowId}
              state={this.props.state}
            />
          </div>
        )}
      </div>
    );
  },
});

const Hint = React.createClass({
  shouldComponentUpdate: function (nextProps) {
    return nextProps.state.currentRow - 1 <= nextProps.rowId;
  },

  render: function () {
    return <span className={this.props.hintClass}></span>;
  },
});

const HintsRow = React.createClass({
  render: function () {
    const hints = [];

    let idVal;
    let hintClass = '';
    let exactMatches = this.props.state.exactMatches;
    let valueMatches = this.props.state.valueMatches;
    let generateHint = (i) => {
      hintClass = 'hint';
      idVal = this.props.name + '-' + i + 1;
      //update current row
      if (this.props.state.currentRow - 1 === this.props.rowId) {
        if (exactMatches > 0) {
          hintClass = hintClass + ' exact-matches';
          exactMatches--;
        } else if (valueMatches > 0) {
          hintClass = hintClass + ' value-matches';
          valueMatches--;
        } else {
          hintClass = hintClass + ' none-matches';
        }
      }

      hints.push(
        <Hint
          key={idVal}
          hintClass={hintClass}
          rowId={this.props.rowId}
          state={this.props.state}
        />,
      );
    };

    times(this.props.state.pegsInRow)(generateHint);

    return <div className="hints-row">{hints}</div>;
  },
});

const DecodingBoard = React.createClass({
  render: function () {
    let rows = [];
    let rowName;
    let type = this.props.type;

    let generateRow = (i) => {
      rowName = 'decodeRow-' + i + 1;
      rows.push(
        <Row
          chosenCode={this.props.chosenCode}
          creatingCode={this.props.state.creatingCode}
          name={rowName}
          key={i + 1}
          rowId={i}
          state={this.props.state}
          activatePeg={this.props.activatePeg}
          submitPegs={this.props.submitPegs}
        />,
      );
    };
    times(this.props.state.attempts)(generateRow);

    return <div className="decoding-board left">{rows}</div>;
  },
});

const CodePegs = React.createClass({
  render: function () {
    const pegs = [];
    let idVal;
    let pegClass;

    for (let [key, value] of this.props.colors) {
      idVal = 'peg-' + key;
      pegClass = 'peg ' + value;
      if (value === this.props.selectedPeg) {
        pegClass = pegClass + ' selected';
      }
      pegs.push(
        <Peg
          idVal={idVal}
          name="peg"
          value={value}
          key={idVal}
          pegClass={pegClass}
          isCurrentRow={true}
          activatePeg={this.props.activatePeg}
        />,
      );
    }

    return <div className="codepegs right">{pegs}</div>;
  },
});

const EndGame = React.createClass({
  render: function () {
    const endGameInfoClass = classNames({
      endgame: true,
      hidden: !this.props.endGame,
    });
    const endGameStatusClass = classNames({
      'endgame-relative': true,
      success: this.props.success,
      failure: !this.props.success,
    });
    const infoText = this.props.success ? 'Congratulations!' : 'GAME OVER!';

    return (
      <div className={endGameInfoClass}>
        <div className={endGameStatusClass}>
          <h2 className="endgame-header">{infoText}</h2>
          <button className="endgame-btn" onClick={this.props.reloadGame}>
            PLAY AGAIN
          </button>
        </div>
        <div className="endgame-relative endgame-overlay"></div>
      </div>
    );
  },
});

const App = React.createClass({
  getInitialState: function () {
    return {
      code: false, //the main code to be decoded
      selectedPeg: this.props.colors.get(0),
      type: false,
      tries: 0,
      creatingCode: false,
      currentRow: 0,
      algorithm: '',
      currentGuess: new Map(),
      exactMatches: 0,
      startAi: false,
      valueMatches: 0,
      pegsInRow: 4,
      attempts: 0,
      rules: false,
      human: false,
      success: false,
      endGame: false,
      algorithmGuesses: [],
    };
  },

  chosenCode: function () {
    this.setState({ creatingCode: false });
  },

  reloadGame: function (code, type) {
    if (type === 'AI') {
      this.setState({ code: code, type: type, attempts: 10 });
      this.setState({ success: false });
      this.setState({ endGame: false });
      this.setState({ selectedPeg: this.props.colors.get(0) });
      this.setState({ currentRow: 0 });
      this.setState({ currentGuess: new Map() });
      this.setState({ exactMatches: 0 });
      this.setState({ valueMatches: 0 });
      this.guessTheCode();
    } else {
      this.setState({ success: false });
      this.setState({ endGame: false });
      this.setState({ code: false, type: false });
      this.setState({ selectedPeg: this.props.colors.get(0) });
      this.setState({ currentRow: 0 });
      this.setState({ currentGuess: new Map() });
      this.setState({ exactMatches: 0 });
      this.setState({ valueMatches: 0 });
    }
  },

  toggleRules: function () {
    this.setState({ rules: !this.state.rules });
  },

  //NOTE: create random code
  getRandomArbitrary: function (min = 0, max = 5) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  getCode: function () {
    const code = new Map();

    //NOTE: code gets saved here
    let generateCode = (i) => {
      code.set(i, this.props.colors.get(this.getRandomArbitrary()));
    };

    times(this.props.codeLength)(generateCode);
    console.log(code);
    return code;
  },

  activatePeg: function (event) {
    //if one of the peg on the right was selected
    if (event.target.name.startsWith('peg')) {
      this.setState({ selectedPeg: event.target.value });
    } else {
      //else if one of the pegs on the decoding board was selected
      if (this.state.selectedPeg) {
        //if peg on the right was selected
        this.setState({
          currentGuess: this.state.currentGuess.set(
            event.target.value - 1,
            this.state.selectedPeg,
          ),
        });
      }
    }
  },

  keyOf: function (map, valueToFind) {
    for (let [key, value] of map) {
      if (valueToFind === value) {
        return key;
      }
    }

    return -1;
  },

  linkCode: async function (guess) {
    const code = new Map();
    console.log(guess);
    let generateCode = (guess) => {
      guess.forEach((color, i) => {
        code.set(i, this.props.colors.get(color));
      });
    };

    await generateCode(guess);
    return code;
  },

  //NOTE: send request to API
  guessTheCode: async function (exactMatches, valueMatches) {
    if (!this.state.endGame) {
      await this.setState({ tries: this.state.tries + 1 });
      let colors = Array.from(this.props.colors, ([name, value]) => ({ name, value }));
      let array = Array.from(this.state.code, ([name, value]) => ({ name, value }));
      const response = await axios.post('http://localhost:5000/mastermind', {
        code: array,
        holes: this.state.pegsInRow,
        colors: colors.length,
        correct: exactMatches || 0,
        close: valueMatches || 0,
        tries: this.state.tries,
        algorithm: this.state.algorithm,
      });
      if (response && response.data.guess) {
        if (response.data.guess) {
          console.log(response.data.guess);
          for (var i = 0; i < response.data.guess.length; i++) {
            console.log(response.data.guess);
            const response_to_map = await this.linkCode(response.data.guess[i]);
            console.log(response_to_map);
            await this.setState({ currentGuess: response_to_map });
            this.submitPegs();
            console.log(this.state.currentGuess);
          }
        } else {
          const response_to_map = this.linkCode(response.data.guess);
          this.setState({ currentGuess: response_to_map });
        }
      }
    }
  },

  submitPegs: async function () {
    let code;
    let pegs = this.state.currentGuess;
    let foundKey;
    let exactMatches = 0;
    let valueMatches = 0;

    if (this.state.creatingCode === true) {
      this.setState({ creatingCode: false });
    }
    if (!!this.state.code) {
      code = new Map(this.state.code);
      for (let [key, value] of pegs) {
        if (value === code.get(key)) {
          exactMatches++;
          pegs.delete(key);
          code.delete(key);
        }
      }

      // Second pass: Look for value matches anywhere in the code
      for (let [key, value] of pegs) {
        // attempt to find the peg in the remaining code
        foundKey = this.keyOf(code, value);
        if (foundKey !== -1) {
          valueMatches++;
          // remove the matched code peg, since it's been matched
          code.delete(foundKey);
        }
      }

      if (exactMatches === this.state.pegsInRow) {
        this.setState({ endGame: true });
        this.setState({ success: true });
      } else if (this.state.attempts === this.state.currentRow + 1) {
        this.setState({ endGame: true });
      }
      this.setState({ exactMatches: exactMatches });
      this.setState({ valueMatches: valueMatches });
      this.setState({ currentRow: this.state.currentRow + 1 });
    } else {
      this.setState({ code: pegs, attempts: 10 });
      this.reloadGame(pegs, 'AI');
    }
  },

  render: function () {
    return (
      <div>
        {!this.state.type ? (
          <div>
            <button
              className="nice-button"
              onClick={() =>
                this.setState({ type: 'human', code: this.getCode(), attempts: 10 })
              }
            >
              Mens
            </button>
            <button
              className="nice-button"
              onClick={() =>
                this.setState({ type: 'AI', attempts: 1, creatingCode: true })
              }
            >
              AI
            </button>
          </div>
        ) : (
          <div>
            {this.state.type !== 'AI' ? (
              <div>
                <h1>
                  <span className="M">M</span>
                  <span className="A">A</span>
                  <span className="S">S</span>
                  <span className="T">T</span>
                  <span className="E">E</span>
                  <span className="R">R</span>
                  <span className="MIND">MIND</span>
                </h1>
                <br />
                <h2>Playing against: {this.state.type}</h2>

                <Rules rules={this.state.rules} toggleRules={this.toggleRules} />

                <div className="clearfix">
                  <DecodingBoard
                    state={this.state}
                    activatePeg={this.activatePeg}
                    submitPegs={this.submitPegs}
                  />
                  <CodePegs
                    selectedPeg={this.state.selectedPeg}
                    colors={this.props.colors}
                    activatePeg={this.activatePeg}
                  />
                </div>
                <EndGame
                  endGame={this.state.endGame}
                  success={this.state.success}
                  reloadGame={this.reloadGame}
                />
                <div className="cheat">{this.state.code}</div>
              </div>
            ) : (
              <div>
                {!this.state.code ? (
                  <div>
                    <h1>
                      <span className="M">M</span>
                      <span className="A">A</span>
                      <span className="S">S</span>
                      <span className="T">T</span>
                      <span className="E">E</span>
                      <span className="R">R</span>
                      <span className="MIND">MIND</span>
                    </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <h2> choose the code for the algorithm to guess:</h2>
                    <div className="clearfix">
                      <DecodingBoard
                        state={this.state}
                        chosenCode={this.chosenCode}
                        activatePeg={this.activatePeg}
                        submitPegs={this.submitPegs}
                        type="AI"
                      />
                      <CodePegs
                        selectedPeg={this.state.selectedPeg}
                        colors={this.props.colors}
                        activatePeg={this.activatePeg}
                      />
                    </div>
                    <button onClick={() => this.setState({ algorithm: 'simpel' })}>
                      simpel
                    </button>
                    <button onClick={() => this.setState({ algorithm: 'kooi' })}>
                      kooi
                      <button onClick={() => this.setState({ algorithm: 'idk' })}>
                        idk
                      </button>
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1>
                      <span className="M">M</span>
                      <span className="A">A</span>
                      <span className="S">S</span>
                      <span className="T">T</span>
                      <span className="E">E</span>
                      <span className="R">R</span>
                      <span className="MIND">MIND</span>
                    </h1>
                    <br />
                    <h2>Playing against: {this.state.type}</h2>
                    <Rules rules={this.state.rules} toggleRules={this.toggleRules} />
                    <br />
                    <br />
                    <h2>The code the algorithm has to guess: {this.state.code}</h2>
                    <div className="clearfix">
                      <DecodingBoard
                        state={this.state}
                        activatePeg={this.activatePeg}
                        submitPegs={this.submitPegs}
                      />
                      <CodePegs
                        selectedPeg={this.state.selectedPeg}
                        colors={this.props.colors}
                        activatePeg={this.activatePeg}
                      />
                    </div>
                    <EndGame
                      endGame={this.state.endGame}
                      success={this.state.success}
                      reloadGame={this.reloadGame}
                    />
                    <div className="cheat">{this.state.code}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
});

export default App;
