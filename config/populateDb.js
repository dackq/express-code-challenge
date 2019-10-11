require("dotenv").config();
require("../models/db/mongoose");
const { dbInit, clearDb } = require("../tests/fixtures/dbInit");

clearDb();
dbInit();
