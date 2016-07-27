/***
 * Basic REST API for users.
 */

var User = require('../models/user');

var UserHandler = function() {
	this.createUser = handleCreateUserRequest;
	this.getUser = handleGetUserRequest;
	this.deleteUser = handleDeleteUserRequest;
};

// Create the user.
function handleCreateUserRequest(req, res) {
	var username = req.body.username || null;
	var password = req.body.password || null;
	var firstName = req.body.firstName || null;
	var lastName = req.body.lastName || null;
	var email = req.body.email || null;
	// TODO: create in backing store
	var user = User.create();
	user.username(username);
	user.firstName(firstName);
	user.lastName(lastName);
	user.email(email);
	res.json(201, user);
}

function handleGetUserRequest(req, res) {
	var userId = req.params.userId || null;
	var user = User.create();
	user.username(userId);
	user.firstName("John");
	user.lastName("User");
	user.email("juser@vmware.com");
	console.log(user.toJSON());
	res.status(200).json(user.toJSON());
}

function handleDeleteUserRequest(req, res) {
	var userId  = req.params.userId || null;
	// TODO: delete from backing store
	res.json(204, null);
}

module.exports = UserHandler;
