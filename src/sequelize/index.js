const { Sequelize } = require("sequelize");

const configs = require("../configs");

const sequelize = new Sequelize(configs.db.name, configs.db.username, configs.db.password, {
    host: configs.db.host,
    dialect: configs.db.dialect,
    dialectOptions: {
        typeCast: function (field, next) {
            // for reading from database
            if (field.type === "DATETIME") {
                return field.string();
            }
            return next();
        },
    },
    timezone: configs.db.timezone, // for writing to database
});

module.exports = sequelize;
