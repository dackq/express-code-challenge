const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/user");
const router = new express.Router();

/* User Routes */

// POST /users/signin
// user credentials are authenticated by passport. If they are invalid, passport returns unauthorized. If they are valid this route returns an http reponse with a success message and the user data.
router.post("/users/signin", passport.authenticate("local"), (req, res) => {
	res.status(200).send({
		success: "success",
		data: req.user
	});
});

// POST /users/create
router.post("/users/create", UserController.createUser);

// GET /books
router.get("/books", UserController.getUserBooks);

module.exports = router;
