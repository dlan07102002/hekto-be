const { DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../sequelize");

class User extends Model {}

User.init(
    {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        fullName: DataTypes.STRING,
    },
    {
        timestamps: true,
        sequelize,
    }
);

User.addHook("beforeValidate", (user) => {
    user.fullName = user.firstName + " " + user.lastName;
});

User.addHook("beforeCreate", async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
});

module.exports = User;
