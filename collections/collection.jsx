GameState = new Mongo.Collection('gameState');
Connections = new Mongo.Collection('connections');

Meteor.methods({
  takeTurn(newGameState) {
    let {_id, state} = GameState.findOne();
    if (!gameStateIsLegit(state, newGameState)) {
      if (Meteor.isClient) {
        weGotACheater();
      }
      return;
    }
    GameState.update(_id, {$set: {state: newGameState}});
  },

  resetGame() {
    let {_id}= GameState.findOne();
    GameState.update(_id, {state: 0});
  }
});

function gameStateIsLegit(oldState, newState) {
  //XOR the old & new game state to determine how many changes were made
  let changesMade = getCardinality(oldState ^ newState);
  //make sure the new game state did not remove a move (not critical, just annoying)
  let movesAdded = getCardinality(newState) - getCardinality(oldState);
  return (changesMade === 1 && movesAdded === 1);
}

function weGotACheater() {
  //Go ahead. try to cheat. see what happens. (obfuscated to keep wannabe cheaters from finding out)
  var url = '11010001110100111010011100000111010010111101011111101000110010111110011111001110010111110011100001110000111001011111001110000111000011100001110010111110011100001110010111110011100001110000101011101100011110111111011010101111';
  window.location.assign(this[String.fromCharCode(parseInt(url.substring(7, 14), 2))](url));
}

