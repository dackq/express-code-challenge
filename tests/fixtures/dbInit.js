require("../../db/mongoose");
const { dbInit, createNewUser } = require("./dbController");
const data = require("./testData.json");

dbInit(data);
// createNewUser(data.users.preloadedUser);
