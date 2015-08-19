const {RaisedButton} = mui;
PlayerButton = React.createClass({
  setPlayer() {
    FlowRouter.go('Game', {player: 'player' + this.props.playerNum});
  },
  render() {
    let label = 'Player #' + this.props.playerNum;
    return (
      <RaisedButton label={label}
                    primary={true}
                    onClick={this.setPlayer}
        />
    )
  }
});
