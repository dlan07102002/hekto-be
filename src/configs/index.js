require("dotenv").config();

const app = require("./app");
const db = require("./db");
const jwt = require("./jwt");
//file cấu hình
const configs = {
    app,
    db,
    jwt,
};

module.exports = configs;
