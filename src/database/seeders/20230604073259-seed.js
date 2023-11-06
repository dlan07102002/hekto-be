"use strict";

const Category = require("../../models/category.model");

const images = [
    "\\images\\1685862819484-image1.png",
    "\\images\\1685863139101-image2.png",
    "\\images\\1685863186746-image3.png",
    "\\images\\1685863450366-image4.png",
];

const data = [
    {
        name: "Đồ gia dụng",
        children: [
            { name: "TV", price: 3000 },
            { name: "Tủ lạnh", price: 4000 },
            { name: "Điều hòa", price: 4000 },
            { name: "Máy giặt", price: 3500 },
            { name: "Nồi cơm điện", price: 2000 },
        ],
    },
    {
        name: "Phụ kiện thời trang",
        children: [
            { name: "Quần", price: 3000 },
            { name: "Áo", price: 4000 },
            { name: "Túi sách", price: 4000 },
            { name: "Áo khoác", price: 3500 },
            { name: "Giày", price: 2000 },
        ],
    },
    {
        name: "Đồ điện tử",
        children: [
            { name: "Điện thoại", price: 3000 },
            { name: "Máy tính", price: 4000 },
            { name: "Màn hình", price: 4000 },
            { name: "Tablet", price: 3500 },
            { name: "Ổ điện", price: 2000 },
        ],
    },
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up() {
        const categories = await Category.bulkCreate([
            {
                name: "Đồ gia dụng",
                description: "Mô tả đồ gia dụng",
            },
            {
                name: "Phụ kiện thời trang",
                description: "Mô tả phụ kiện thời trang",
            },
            {
                name: "Đồ điện tử",
                description: "Mô tả đồ điện tử",
            },
        ]);

        for (let i = 0; i < categories.length; i++) {
            const productsData = data[i].children;

            for (let j = 0; j < productsData.length; j++) {
                const product = await categories[i].createProduct({
                    name: productsData[j].name,
                    description: "Mô tả " + productsData[j].name,
                    price: productsData[j].price,
                });

                const thumbnailIndex = getRandomInt(0, 3);
                for (let k = 0; k < images.length; k++) {
                    await product.createImage({
                        isThumbnail: k === thumbnailIndex,
                        path: images[k],
                    });
                }
            }
        }
    },

    async down() {
        await Category.destroy({ where: {} });
    },
};
