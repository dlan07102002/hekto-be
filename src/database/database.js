const configs = require("../configs");

module.exports = {
    development: {
        username: configs.db.username,
        password: configs.db.password,
        database: configs.db.name,
        host: configs.db.host,
        dialect: configs.db.dialect,
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
