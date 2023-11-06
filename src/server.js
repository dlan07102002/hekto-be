const express = require("express");
const cors = require("cors");

const configs = require("./configs");
const routes = require("./routes");
const sequelize = require("./sequelize");
const handleError = require("./middleware/handleError");

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    })
);

app.use(express.json());

// Import routing
routes(app);

// Handle error
app.use(handleError);

// static file
app.use(express.static("public"));

sequelize
    .authenticate()
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => {
        console.log("err:", err);
    });

app.listen(configs.app.port, () => {
    console.log("App is running on port:", configs.app.port);
});
