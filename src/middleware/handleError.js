const ApiError = require("../utils/ApiError");

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
    let { status, message } = err;
    if (!(err instanceof ApiError)) {
        status = 500;
    }

    res.status(status).json({
        code: status,
        message,
    });
};

module.exports = handleError;
