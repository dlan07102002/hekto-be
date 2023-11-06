const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class BlacklistToken extends Model {}

BlacklistToken.init(
    {
        type: DataTypes.STRING,
        exp: DataTypes.BIGINT,
    },
    {
        timestamps: true,
        sequelize,
    }
);

module.exports = BlacklistToken;
