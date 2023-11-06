const express = require("express");

const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");
const validate = require("../middleware/validate");
const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const authValidation = require("../validations/auth.validation");

const route = express.Router();

route.post("/register", validate(authValidation.registerSchema), authController.register);
route.post("/login", validate(authValidation.loginSchema), authController.login);
route.get("/current-user", verifyToken, authController.getCurrentUser);
route.get("/refresh-token", verifyRefreshToken, authController.refreshToken);
route.get("/logout", verifyRefreshToken, authController.logout);

module.exports = route;
