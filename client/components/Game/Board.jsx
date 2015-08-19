//a seqential array from 0 to 9
const EMPTY_SQUARES = Array.apply(null, new Array(9)).map(function (x, i) { return i });

Board = React.createClass({
  propTypes: {
    gameState: React.PropTypes.object
  },
  render() {
    let gameOver = !!checkForWinner(this.props.gameState.state);
    let squares = EMPTY_SQUARES.map(square => {
      //let val = getSquareVal.call(this, square);
      //let disabled = disabledBoard || (val !== '');
      return (
        <Square key={square} gameOver={gameOver} squareNum={square} gameState={this.props.gameState}/>
      );
    });
    return (
      <div className="board">
        { squares }
      </div>
    )
  }
});
