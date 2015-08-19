//Parent component
const {CircularProgress} = mui,
  ThemeManager = new mui.Styles.ThemeManager();
injectTapEventPlugin();

Game = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe("gameState");
    let conHandle = Meteor.subscribe("connections");
    return {
      gameStateLoading: !handle.ready(),
      gameState: GameState.findOne()
    }
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    if (this.data.gameStateLoading) {
      //wait for sub
      return (
        <div className="game">
          <div className="spinner">
            <CircularProgress mode="indeterminate"/>
          </div>
        </div>
      );
    }
    return (
      <div className="game">
        <Status gameState={this.data.gameState}/>
        <div className="board">
          <Board gameState={this.data.gameState}/>
        </div>
        <NewGame/>
      </div>
    );
  }
});
