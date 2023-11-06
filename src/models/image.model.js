const { DataTypes, Model } = require("sequelize");

const sequelize = require("../sequelize");
const Product = require("./product.model");
const configs = require("../configs");

class Image extends Model {}

Image.init(
    {
        productId: DataTypes.INTEGER,
        path: DataTypes.STRING,
        isThumbnail: DataTypes.BOOLEAN,
        url: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.path ? `http://localhost:${configs.app.port}${this.path}` : null;
            },
        },
    },
    {
        timestamps: true,
        sequelize,
    }
);

Product.hasMany(Image, {
    foreignKey: "productId",
    as: "images",
});
Image.belongsTo(Product, {
    foreignKey: "productId",
    as: "product",
});

module.exports = Image;
