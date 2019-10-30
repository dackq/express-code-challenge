const express = require("express");
const passport = require("passport");
const UserController = require("../controllers/user");

const router = new express.Router();

// ROUTES

//User Routes
/**
 *  Passport is used to authenticate user and will throw unauthorized if they are not
 *  authenticated. If they are authorized then this route will send a success message
 *  with the user's data
 */
router.post("/users/signin", passport.authenticate("local"), (req, res) => {
	res.status(200).send({
		success: "success",
		data: req.user
	});
});
router.post("/users/create", UserController.createUser);

router.get("/books", UserController.getUserBooks);

module.exports = router;
