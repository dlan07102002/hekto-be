const authRoute = require("./auth.route");
const productRoute = require("./product.route");

const route = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/products", productRoute);
};

module.exports = route;
