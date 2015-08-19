Meteor.publish('gameState', function () {
  return GameState.find();
});
Meteor.publish('connections', function () {
  return Connections.find();
});
if (GameState.find().count() === 0) {
  //state is treated as an int32. Bits 0-8 mark all the squares where there is an X. Bits 9-18 are for O.
  //From a single variable, we can derive who's turn (based on # of moves), as well as the winner
  GameState.insert({state: 0})
}

Meteor.onConnection(connection => {
  Connections.insert({
    _id: connection.id,
    location: ''
  });
  connection.onClose(() => {
    Connections.remove({_id: connection.id});
  })
});

Meteor.methods({
  joinGame(location) {
    Meteor.call('resetGame');
    Connections.update({_id: this.connection.id}, {location: location});
  }
});

Meteor.startup(function () {
  Connections.remove({});
});
