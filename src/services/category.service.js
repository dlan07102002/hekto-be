const Category = require("../models/category.model");

const getCategoryById = async (id) => {
    return await Category.findOne({ where: { id } });
};

module.exports = {
    getCategoryById,
};
