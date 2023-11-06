const { TokenExpiredError } = require("jsonwebtoken");

const ApiError = require("../utils/ApiError");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const TOKEN_TYPES = require("../constants/token");

const verifyRefreshToken = async (req, res, next) => {
    const bearerToken = req.get("Authorization");

    if (bearerToken) {
        const token = bearerToken.split(" ")[1];

        try {
            const payload = tokenService.decodeToken(token);

            if (payload.type !== TOKEN_TYPES.REFRESH || (await tokenService.checkIsBlacklist(payload.jti))) {
                return next(new ApiError(401, "Unauthenticated."));
            }

            const user = await userService.getUserById(payload.sub);

            if (!user) {
                return next(new ApiError(401, "Unauthenticated."));
            }
            req.user = user;

            await tokenService.saveToBlacklist(payload);

            return next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return next(new ApiError(401, "Token was expired."));
            }
        }
    }

    return next(new ApiError(401, "Unauthenticated."));
};

module.exports = verifyRefreshToken;
