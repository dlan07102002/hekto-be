const { DataTypes, Model } = require("sequelize");
const sequelizePaginate = require("sequelize-paginate");

const sequelize = require("../sequelize");
const Category = require("./category.model");
const User = require("./user.model");

class Product extends Model {}

Product.init(
    {
        categoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.INTEGER,
    },
    {
        timestamps: true,
        sequelize,
    }
);

sequelizePaginate.paginate(Product);

Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
});

Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
});

Product.belongsToMany(User, { through: "ProductUser", as: "likedUsers" });

User.belongsToMany(Product, { through: "ProductUser", as: "likedProducts" });

module.exports = Product;
