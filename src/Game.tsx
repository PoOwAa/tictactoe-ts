import { Component, h } from "preact";
import Board from "./Board";

/**
 * Properties for initialization
 *
 * @export
 * @interface GameProps
 */
export interface GameProps {
  // A játék osztály 1 komponens szintű paramétert vár, az a pálya mérete
  dimensions: number;
}

/**
 * Azok a változók amik ha változnak,
 * akkor a böngészőben is egyből látszódik a változás
 *
 * @export
 * @interface GameState
 */
export interface GameState {
  // Magák a mezők
  squares: string[];
  // Következő X lesz-e vagy sem
  xIsNext: boolean;
  // Nyertes játékos
  winner: string;
}

export default class Game extends Component<GameProps, GameState> {
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

    this.state = {
      squares: Array(this.props.dimensions * this.props.dimensions).fill(null),
      xIsNext: true,
      winner: null
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
    // Csak akkor működjön ha még nem volt beállítva a mező értéke és még tart a játék
    if (this.state.squares[i] === null && this.state.winner === null) {
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
        this.setState({
          winner
        });
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
          sum++;
        }
        if (this.state.squares[row * this.props.dimensions + col] === "O") {
          sum--;
        }
      }

      // X nyert
      if (sum === this.props.dimensions) {
        return "X";
      }
      // O nyert
      if (sum === -this.props.dimensions) {
        return "O";
      }
    }
    // Oszlopok
    for (let col = 0; col < this.props.dimensions; col++) {
      let sum = 0;
      for (let row = 0; row < this.props.dimensions; row++) {
        if (this.state.squares[row * this.props.dimensions + col] === "X") {
          sum++;
        }
        if (this.state.squares[row * this.props.dimensions + col] === "O") {
          sum--;
        }
      }

      // X nyert
      if (sum === this.props.dimensions) {
        return "X";
      }
      // O nyert
      if (sum === -this.props.dimensions) {
        return "O";
      }
    }
    // Átlók
    let sum = 0;
    for (let i = 0; i < this.props.dimensions; i++) {
      if (this.state.squares[i * this.props.dimensions + i] === "X") {
        sum++;
      }
      if (this.state.squares[i * this.props.dimensions + i] === "O") {
        sum--;
      }
    }
    // X nyert
    if (sum === this.props.dimensions) {
      return "X";
    }
    // O nyert
    if (sum === -this.props.dimensions) {
      return "O";
    }

    sum = 0;
    let col = 0;
    for (let row = this.props.dimensions - 1; row >= 0; row--) {
      if (this.state.squares[row * this.props.dimensions + col] === "X") {
        sum++;
      }
      if (this.state.squares[row * this.props.dimensions + col] === "O") {
        sum--;
      }
      col++;
    }
    // X nyert
    if (sum === this.props.dimensions) {
      return "X";
    }
    // O nyert
    if (sum === -this.props.dimensions) {
      return "O";
    }
    return false;
  }
}
