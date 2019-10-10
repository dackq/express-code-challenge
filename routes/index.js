/**
 * The default index route handler.
 * Responds to a request with body content to demonstrate the app is running as expected.
 */
module.exports = (req, res, next) => {
	res.end(`Express Code Challenge Started`);
};
