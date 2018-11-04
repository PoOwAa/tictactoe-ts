import { Component, h } from "preact";

/**
 * Négyzet html kódja
 *
 * @param {*} props
 * @returns
 */
function Square(props) {
  return (
    <button
      className="square btn waves-effect waves-light"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export interface BoardProps {
  dimensions: number;
  squares: string[];
  onClick;
}

export default class Board extends Component<BoardProps, any> {
  /**
   * Egy négyzet kirajzolása
   *
   * @param {number} i
   * @returns
   * @memberof Board
   */
  renderSquare(i: number) {
    // Négyzetek
    const squares = this.props.squares;
    return <Square value={squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  /**
   * Tábla kirajzolása
   *
   * @returns
   * @memberof Board
   */
  renderBoard() {
    let rows = [];

    // Sorok
    for (let row = 0; row < this.props.dimensions; row++) {
      let cols = [];

      // Oszlopok
      for (let col = 0; col < this.props.dimensions; col++) {
        // A html elemeket tartalmazó változó egy tömb
        // row * this.props.dimensions + col --> 1 dimenziós tömbben is tárolhatóak így a mezők
        // Oszlop hozzáadása
        cols.push(this.renderSquare(row * this.props.dimensions + col));
      }

      // Sor hozzáadása
      rows.push(<div className="board-row">{cols}</div>);
    }

    return rows;
  }

  /**
   *
   *
   * @param {*} props
   * @returns
   * @memberof Board
   */
  render(props) {
    return <div>{this.renderBoard()};</div>;
  }
}
