const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        title: {type: String},
        description: {type: String},
        category: { type: Array, default: [] },
        brand: {type:String},
        colors: {type: Array, default: []},
        price: {type: Number},
        images: { type: Array, default: [] },
        reviews: {type: Array, default: []},
        averageRating: {type: Number},
        availableUnits: {type: Number},
        sku: {type: String},
        url: { type: String}
    },
    { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;