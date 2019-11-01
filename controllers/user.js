const User = require("../db/models/user");
require("../db/models/book");

/**
 * User Controller
 * @description Module containing functions which will be used by api routers to modify, create, or access user database model information.
 *
 * @module UserController
 */

/**
 * Create User.
 * @description This creates a user. User details are sent on the req.body object
 * and returned on the res.data object. If the request is invalid the res.success
 * value will be 'fail'. Used with the POST /users/create route.
 * @param {object} req Http request for the route. Must include body property with
 * new user credentials.
 * @param {string} req.body.name User's name
 * @param {string} req.body.email User's email
 * @param {string} req.body.role User's role
 * @param {string} req.body.password User's password. Will be hashed on saving to the database.
 * @param {object} res Http response object that will be used to send the response.
 */
exports.createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).send({
			success: "success",
			data: user
		});
	} catch (error) {
		res.status(400).send({
			success: "fail",
			data: {
				message: error.message,
				error: error.errors
			}
		});
	}
};

/**
 * Get user books.
 * @description This returns a list of books that the user can access based on their
 * institution. Used with the GET /books route.
 * @param {object} req Http request for the route.
 * @param {string} req.user User data. Will be added to the req object by passport
 * after authentication.
 * @param {object} res Http response object that will be used to send the response.
 */
exports.getUserBooks = async (req, res) => {
	try {
		if (req.isAuthenticated()) {
			await req.user.populate("institution").execPopulate();
			await req.user.institution.populate("books").execPopulate();

			res.send({
				success: "success",
				data: {
					books: req.user.institution.books
				}
			});
		} else {
			res.status(401).send({
				success: "fail",
				data: {
					message: "Please sign in"
				}
			});
		}
	} catch (error) {
		res.status(500).send({
			success: "error",
			data: {
				message: error.message,
				error: error.errors
			}
		});
	}
};

/**
 * Sign In User
 * @description This signs in a user. User credentials are authenticated by passport. If they are invalid, passport returns unauthorized. If they are valid this route returns an http reponse with a success message and the user data. Used with the POST /users/signin route.
 * @param {object} req Http request for the route.
 * @param {string} req.email email of user
 * @param {string} req.password password of the user
 * @param {object} res Http response object that will be used to send the response.
 */
exports.signInUser = async (req, res) => {
	try {
		res.status(200).send({
			success: "success",
			data: req.user
		});
	} catch (err) {
		res.status(500).send({
			success: "error",
			data: {
				message: err.message,
				error: err
			}
		});
	}
};

/**
 * Sign In User
 * @description User is signed out using the logout function created by passport on the req object. Used with the POST /users/signout route.
 * @param {object} req Http request for the route.
 * @param {object} res Http response object that will be used to send the response.
 */
exports.signOutUser = async (req, res) => {
	try {
		req.logout();
		res.status(200).send({
			success: "success",
			data: {
				message: "User signed out"
			}
		});
	} catch (err) {
		res.status(500).send({
			success: "error",
			data: {
				message: err.message,
				error: err
			}
		});
	}
};
