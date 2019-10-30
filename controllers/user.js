const User = require("../db/models/user");
require("../db/models/book");

/**
 * User Controller
 * @description Module containing functions which will be used by api routes to
 * modify, create, or access user database model information.
 *
 * @module UserController
 */

/**
 * Create User.
 * @description This creates a user. User details are sent on the req.body object
 * and returned on the res.data object. If the request is invalid the res.success
 * value will be 'fail'.
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
	} catch (err) {
		res.status(400).send({
			success: "fail",
			data: {
				message: err.message
			}
		});
	}
};

/**
 * Get user books.
 * @description This returns a list of books that the user can access based on their
 * institution.
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
				error
			}
		});
	}
};
