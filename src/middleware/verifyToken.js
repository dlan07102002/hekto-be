const { TokenExpiredError } = require("jsonwebtoken");

const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const TOKEN_TYPES = require("../constants/token");

const verifyToken = async (req, res, next) => {
    const bearerToken = req.get("Authorization");

    if (bearerToken) {
        const token = bearerToken.split(" ")[1];

        try {
            const payload = tokenService.decodeToken(token);
            if (payload.type !== TOKEN_TYPES.ACCESS) {
                return next(new ApiError(401, "Unauthenticated."));
            }
            const user = await userService.getUserById(payload.sub);

            if (!user) {
                return next(new ApiError(401, "Unauthenticated."));
            }
            req.user = user;

            return next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return next(new ApiError(401, "Token was expired."));
            }
        }
    }

    return next(new ApiError(401, "Unauthenticated."));
};

module.exports = verifyToken;
