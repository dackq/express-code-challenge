const express = require("express");
const passport = require("passport");

const router = new express.Router();

router.get("/", (req, res) => {
	res.send("Hey hey hey");
});

router.post(
	"/users/signin",
	passport.authenticate("local"),
	async (req, res) => {
		res.status(200).send({ success: "success", data: req.user });
	}
);

router.get("/user", (req, res) => {
	if (req.isAuthenticated()) {
		res.send(req.user);
	} else {
		res.send({ success: "fail", data: { message: "Please sign in" } });
	}
});

module.exports = router;
