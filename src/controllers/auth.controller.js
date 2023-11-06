const userService = require("../services/user.service");
const tokenService = require("../services/token.service");
const authService = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");

const register = catchAsync(async (req, res) => {
    const body = req.body;

    if (await userService.checkExistsEmail(body.email.trim())) {
        throw new ApiError(409, "Email was existed.");
    }

    const user = await userService.createUser({
        email: body.email.trim(),
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        password: body.password.trim(),
    });

    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            accessToken,
            refreshToken,
        },
    });
});

const login = catchAsync(async (req, res) => {
    const body = req.body;

    const user = await userService.getUserByEmail(body.email);
    if (!user) {
        throw new ApiError(401, "Unauthenticated.");
    }

    const isValidPassword = await authService.comparePassword(body.password, user.password);
    if (!isValidPassword) {
        throw new ApiError(401, "Unauthenticated.");
    }

    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            accessToken,
            refreshToken,
        },
    });
});

const getCurrentUser = catchAsync(async (req, res) => {
    const user = req.user;

    const data = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };

    return res.json({
        data,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const user = req.user;
    const accessToken = tokenService.createAccessToken(user.id);
    const refreshToken = tokenService.createRefreshToken(user.id);

    return res.json({
        data: {
            accessToken,
            refreshToken,
        },
    });
});

const logout = catchAsync(async (req, res) => {
    return res.json({
        data: true,
        message: "Logged out.",
    });
});

module.exports = {
    register,
    login,
    getCurrentUser,
    refreshToken,
    logout,
};
