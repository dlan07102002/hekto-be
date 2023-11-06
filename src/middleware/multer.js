const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

/**
 *
 * @param {multer.Options} options
 * @returns
 */
const upload = (options) => {
    return multer({
        ...options,
        storage,
    });
};

module.exports = upload;
