'use strict';
module.exports = function(Reservation) {
  Reservation.beforeRemote('create', function(ctx, reservation, next) {
    // TODO: About to create a reservation.
    next();
  });
  Reservation.afterRemote('create', function(ctx, reservation, next) {
    // TODO: Have created a reservation.
    next();
  });
  Reservation.observe('before save', function enqueue(ctx, next) {
    if (ctx.instance) {
      //TODO: Write to a Kafka style queue for processing.
      console.log('Should write to a queue here.');
    }
    next();
  });
};
