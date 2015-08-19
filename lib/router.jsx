FlowRouter.route('/', {
  name: 'Home',
  action(params) {
    ReactLayout.render(Home)
  }
});

FlowRouter.route('/:player?', {
  name: 'Game',
  action(params) {
    if (params.player !== 'player1' && params.player !== 'player2') {
      FlowRouter.go('Home');
    }
    Meteor.call('joinGame', params.player);
    ReactLayout.render(Game);
  }
});
