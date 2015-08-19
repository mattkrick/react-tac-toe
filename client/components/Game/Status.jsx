const statusTextDict = {
  win: 'You win!',
  lose: 'You LOSE',
  tie: 'Cat\'s game',
  noOpponent: 'Waiting for an opponent to join...',
  myTurn: 'It\'s your turn!',
  opponentTurn: 'Waiting for the other player to move'
};

Status = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    gameState: React.PropTypes.object
  },
  getMeteorData() {
    //Apparently, I don't even have to use this, just putting it in the component makes the render() reactive
    //Comment out this method & it breaks reactivity in the render method
    return {
      connections: Connections.find().fetch()
    }
  },
  render() {
    let playerNum = FlowRouter.getParam('player');
    let iAmPlayerOne = playerNum === 'player1';
    let {state} = this.props.gameState;
    let winner = checkForWinner(state);
    let opponentCount = Connections.find({
      location: iAmPlayerOne ? 'player2' : 'player1'
    }).count();
    let myTurn = iAmPlayerOne === player1Turn(state);
    let status;
    if (myTurn) status = 'myTurn';
    if (!myTurn) status = 'opponentTurn';
    if (opponentCount === 0) status = 'noOpponent';
    if (winner && winner !== playerNum) status = 'lose';
    if (winner && winner === playerNum) status = 'win';
    if (winner && winner === 'tie') status = 'tie';
    let statusText = statusTextDict[status];
    return (
      <div className="currentStatus">{statusText}</div>
    );
  }
});

