const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");

class Category extends Model {}

Category.init(
    {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    },
    {
        timestamps: true,
        sequelize,
    }
);

module.exports = Category;
