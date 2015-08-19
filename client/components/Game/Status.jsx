Status = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    gameState: React.PropTypes.object
  },
  getMeteorData() {
    //Apparently, I don't even have to use this, just putting it in the component makes the render() reactive
    return {
      connections: Connections.find().fetch()
    }
  },
  render() {
    let playerNum = FlowRouter.getParam('player');
    let iAmPlayerOne = playerNum === 'player1';
    let {state} = this.props.gameState;
    let winner = checkForWinner(state);
    let statusText;
    let opponentCount = Connections.find({
      location: iAmPlayerOne ? 'player2' : 'player1'
    }).count();
    if (winner) {
      statusText = (winner === playerNum) ? 'You win!' : 'You LOSE';
    } else if (opponentCount === 0) {
      statusText = 'Waiting for an opponent to join...'
    } else {
      statusText =  (iAmPlayerOne === player1Turn(state)) ? 'It\'s your turn!' : 'Waiting for the other player to move';
    }

    return (
      <div className="currentStatus">{statusText}</div>
    );
  }
});

