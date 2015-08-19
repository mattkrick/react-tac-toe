const {FontIcon, Colors} = mui;
Square = React.createClass({
  propTypes: {
    squareNum: React.PropTypes.number.isRequired,
    gameState: React.PropTypes.object
  },
  handleClick() {
    //This whole thing only serves to minimize touches to the server
    if (getSquareVal.call(this) !== '') return; //make sure nothing is in the square
    let {squareNum, gameState} = this.props;
    let playerStr = FlowRouter.getParam('player');
    let isPlayer1 = playerStr[playerStr.length - 1] === '1';
    let isPlayer1Turn = player1Turn(gameState.state); //make sure it's the player's turn
    if (isPlayer1 !== isPlayer1Turn) return;

    if (!isPlayer1) squareNum += 9; //offset the bit index
    var newGameState = gameState.state | ( 1 << (squareNum)); //add the new turn to the state
    Meteor.call('takeTurn', newGameState);
  },
  render() {
    let {gameOver} = this.props;
    let prettyVal = getSquareVal.call(this);
    let squareClass = 'square';
    //don't change hover color or show a pointer if the player can't click it
    if (gameOver || prettyVal !== '') squareClass += ' disabled';
    return (
      <div className={squareClass} onClick={this.handleClick}>
        {prettyVal}
      </div>
    )
  }
});

function getSquareVal() {
  //Find if an X or O is at the given index, return an icon
  let {gameState, squareNum} = this.props;
  if (((gameState.state >> squareNum) & 1)) {
    return <i className="mdi-content-clear"/>;
  } else if (((gameState.state >> (squareNum + 9)) & 1)) {
    return <i className="mdi-image-panorama-fisheye"/>;
  } else {
    return '';
  }
}
