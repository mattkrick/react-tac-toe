const {RaisedButton} = mui;

NewGame = React.createClass({
  createNewGame() {
    Meteor.call('resetGame');
  },
  render() {
    return (
      <div className="newGame">
        <RaisedButton label="Start New Game"
                      primary={true}
                      onClick={this.createNewGame}
          />
      </div>
    );
  }
});
