const tokenService = require("./token.service");
const TOKEN_TYPES = require("../constants/token");
const User = require("../models/user.model");

const createUser = async (data) => {
    const user = await User.create(data);

    return user;
};

const getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const checkExistsEmail = async (email) => {
    return !!(await getUserByEmail(email));
};

const getUserById = async (id) => {
    return await User.findOne({ where: { id } });
};

const getUserByRequest = async (req) => {
    const bearerToken = req.get("Authorization");

    if (bearerToken) {
        const token = bearerToken.split(" ")[1];

        try {
            const payload = tokenService.decodeToken(token);
            if (payload.type !== TOKEN_TYPES.ACCESS) {
                return null;
            }
            const user = await getUserById(payload.sub);

            return user;
        } catch (err) {}
    }

    return null;
};

module.exports = {
    createUser,
    checkExistsEmail,
    getUserByEmail,
    getUserById,
    getUserByRequest,
};
