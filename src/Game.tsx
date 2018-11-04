import { Component, h } from "preact";
import Board from "./Board";

// A játék osztály 1 komponens szintű paramétert vár, az a pálya mérete
export interface GameProps {
  dimensions: number;
}

export default class Game extends Component<GameProps, any> {
  /**
   * Creates an instance of Game.
   *
   *
   * @param {*} props
   * @memberof Game
   */
  constructor(props) {
    // Component osztály konstruktora
    super(props);

    // state property egy bindolt paraméter, ha itt változik a tartalma
    // egy változónak, az egyből változik a frontenden is
    this.state = {
      // Magák a mezők, null értékkel feltöltjük
      squares: Array(this.props.dimensions * this.props.dimensions).fill(null),
      // Következő X lesz-e vagy sem
      xIsNext: true
    };
  }

  /**
   * Component osztály kötelező függvénye
   * ez fogja megjeleníteni a böngészőben a dolgokat
   *
   * @param {*} props this.props ugyanez ES6-ban
   * @returns
   * @memberof Game
   */
  render(props) {
    return (
      <div className="game">
        <Board
          dimensions={this.props.dimensions}
          squares={this.state.squares}
          onClick={i => this.handleClick(i)}
        />
      </div>
    );
  }

  /**
   * Kattintásra mi történjen
   *
   * @param {number} i
   * @returns
   * @memberof Game
   */
  handleClick(i: number) {
    // Csak akkor működjön ha még nem volt beállítva a mező értéke
    if (this.state.squares[i] === null) {
      // Játék aktuális állása
      const squares = this.state.squares;
      // Mező értékének beállítása
      squares[i] = this.state.xIsNext ? "X" : "O";
      // Státusz felülírása
      this.setState({
        squares
      });

      console.log(this.state.squares, this.state.xIsNext ? "X" : "O");

      // Lett-e győztesünk a lépés után
      let winner = this.calculateWinner();
      if (winner) {
        // TODO: handle winner
        console.log("We have a winner", winner);
        return winner;
      }

      // Következő lépést a másik játékos fogja tenni
      this.setState({
        xIsNext: !this.state.xIsNext
      });
    }
  }

  /**
   * Van-e nyertese a játéknak
   *
   * @returns
   * @memberof Game
   */
  calculateWinner() {
    // Sorok
    for (let row = 0; row < this.props.dimensions; row++) {
      let sum = 0;
      for (let col = 0; col < this.props.dimensions; col++) {
        if (this.state.squares[row * this.props.dimensions + col] === "X") {
          sum += 1;
        } else if (
          this.state.squares[row * this.props.dimensions + col] === "O"
        ) {
          sum += -1;
        } else {
          sum += 0;
        }
      }

      if (sum === this.props.dimensions) {
        return "X";
      }
      if (sum === -this.props.dimensions) {
        return "O";
      }
    }
    // Oszlopok
    for (let col = 0; col < this.props.dimensions; col++) {
      let sum = 0;
      for (let row = 0; row < this.props.dimensions; row++) {
        if (this.state.squares[row * this.props.dimensions + col] === "X") {
          sum += 1;
        } else if (
          this.state.squares[row * this.props.dimensions + col] === "O"
        ) {
          sum += -1;
        } else {
          sum += 0;
        }
      }

      if (sum === this.props.dimensions) {
        return "X";
      }
      if (sum === -this.props.dimensions) {
        return "O";
      }
    }
    // Átlók
    // TODO:
    return false;
  }
}
