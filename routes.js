function setup(app, handlers) {
  app.get('/api/user/:userId', handlers.user.getUser);
}

exports.setup = setup;
