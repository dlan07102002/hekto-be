const { Op, literal } = require("sequelize");

const Product = require("../models/product.model");
const Image = require("../models/image.model");
const ApiError = require("../utils/ApiError");

const getProductById = async (id, user) => {
    const product = await Product.findOne({
        where: { id },
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        include: [
            {
                model: Image,
                as: "images",
            },
        ],
    });

    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    return product;
};

const getRelatedProducts = async (product) => {
    const relatedProducts = await Product.findAll({
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
        },
        where: {
            categoryId: product.categoryId,
            id: {
                [Op.not]: product.id,
            },
        },
    });

    return relatedProducts;
};

const index = async (user, { limit, page, search, order }) => {
    const data = await Product.paginate({
        page: page || 1,
        paginate: limit || 10,
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        where: {
            name: {
                [Op.like]: `%${(search || "").trim()}%`,
            },
        },
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
        },
        order,
    });

    return data;
};

const like = async (productId, user) => {
    const product = await getProductById(productId);

    await user.addLikedProduct(product);
};

const unlike = async (productId, user) => {
    const product = await getProductById(productId);

    await user.removeLikedProduct(product);
};

const includeLikedProductAttr = (user = null) => {
    return [
        literal(`(EXISTS (SELECT id FROM ProductUser WHERE userId = ${user?.id || 0} AND productId = product.id))`),
        "isLiked",
    ];
};

const includeLikedUsersCountProductAttr = () => {
    return [literal(`(SELECT COUNT(*) FROM ProductUser WHERE productId = product.id)`), "likedUsersCount"];
};

const getFeatureProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        limit: 4,
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
    });

    return products;
};

const getLatestProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user)],
        },
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
        limit: 6,
        order: [
            ["createdAt", "desc"],
            ["id", "desc"],
        ],
    });

    return products;
};

const getTrendingProducts = async (user = null) => {
    const products = await Product.findAll({
        attributes: {
            include: [includeLikedProductAttr(user), includeLikedUsersCountProductAttr()],
        },
        include: {
            model: Image,
            as: "images",
            where: {
                isThumbnail: true,
            },
            limit: 1,
        },
        limit: 4,
        order: [
            ["likedUsersCount", "desc"],
            ["createdAt", "desc"],
            ["id", "desc"],
        ],
    });

    return products;
};

module.exports = {
    getProductById,
    index,
    like,
    unlike,
    getFeatureProducts,
    getLatestProducts,
    getTrendingProducts,
    getRelatedProducts,
};
