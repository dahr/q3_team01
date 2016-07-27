var model = require('nodejs-model');

//create a new model definition _User_ and define _name_/_password_ attributes
var User = model("User");

User.attr('firstName', {
  validations: {
    presence: {
      message: 'First name is required!'
    }
  }
});
User.attr('lastName', {
  validations: {
    presence: {
      message: 'Last name is required!'
    }
  }
});
User.attr('lastName', {
  validations: {
    presence: {
      message: 'Last name is required!'
    }
  }
});
User.attr('email', {
  validations: {
    presence: {
      message: 'username is required!'
    }
  }
});
User.attr('username', {
  validations: {
    presence: {
      message: 'username is required!'
    }
  }
});
User.attr('password', {
  validations: {
    length: {
      minimum: 6,
      maximum: 40,
      messages: {
        tooShort: 'password is too short!',
        tooLong: 'password is too long!'
      }
    }
  },
  //this tags the accessibility as _private_
  tags: ['private']
});

module.exports = User;
