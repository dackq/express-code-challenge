const User = require("../db/models/user");
require("../db/models/book");

const UserController = {
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
	 * @return {object} res.data
	 */
	async createUser(req, res) {
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
	},

	/**
	 * Get user books.
	 * @description This returns a list of books that the user can access based on their
	 * institution.
	 * @param {object} req Http request for the route.
	 * @param {string} req.user User data. Will be added to the req object by passport
	 * after authentication.
	 * @param {object} res Http response object that will be used to send the response.
	 * @return {object} response object with success message and data property. Data will either contain the list of books or an error message depending on sucess.
	 */
	async getUserBooks(req, res) {
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
	}
};

module.exports = UserController;
