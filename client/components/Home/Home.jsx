const {Card, CardTitle, CardText, CardActions} = mui,
  ThemeManager = new mui.Styles.ThemeManager();
Home = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function () {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    return (
      <div className="homeCard">
        <Card>
          <CardTitle title="React Tac Toe" subtitle="Welcome! Please select your player"/>
          <CardText>
          </CardText>
          <CardActions className='homeCardActions'>
            <PlayerButton playerNum='1'/>
            <PlayerButton playerNum='2'/>
          </CardActions>
        </Card>
      </div>
    )
  }
});
