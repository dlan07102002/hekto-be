const productService = require("../services/product.service");
const userService = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");

const show = catchAsync(async (req, res) => {
    const { id } = req.params;

    const user = await userService.getUserByRequest(req);

    const product = await productService.getProductById(id, user);
    const relatedProducts = await productService.getRelatedProducts(product);

    return res.json({
        data: product,
        relatedProducts,
    });
});

const index = catchAsync(async (req, res) => {
    let order = [];
    if (req.query.order) {
        order = req.query.order.split(",").map((clause) => clause.split(":"));
    }

    const user = await userService.getUserByRequest(req);

    const data = await productService.index(user, {
        limit: Number(req.query.limit),
        page: Number(req.query.page),
        search: req.query.search,
        order,
    });

    return res.json({
        data: data.docs,
        pages: data.pages,
        total: data.total,
        currentPage: Number(req.query.page),
    });
});

const like = catchAsync(async (req, res) => {
    const { id } = req.params;

    await productService.like(id, req.user);

    return res.json({
        data: true,
    });
});

const unlike = catchAsync(async (req, res) => {
    const { id } = req.params;

    await productService.unlike(id, req.user);

    return res.json({
        data: true,
    });
});

const getCombineProducts = catchAsync(async (req, res) => {
    const user = await userService.getUserByRequest(req);
    const featureProducts = await productService.getFeatureProducts(user);
    const latestProducts = await productService.getLatestProducts(user);
    const trendingProducts = await productService.getTrendingProducts(user);

    return res.json({
        data: {
            featureProducts,
            latestProducts,
            trendingProducts,
        },
    });
});

module.exports = {
    show,
    index,
    like,
    unlike,
    getCombineProducts,
};
