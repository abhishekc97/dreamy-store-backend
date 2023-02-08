const { Router } = require("express");
const route = Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

// get a list of all categories
route.get("/getCategories", async function(req, res, next) {
    try {
        const results = await Category.find({});

        if(results) {
            res.status(200).send(results);
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// get a list of all products
route.get("/getProducts/:category", async function(req, res, next) {
    try {
        const category = req.params.category;
        if(!category) res.status(400).send("Bad request, check given parameters");

        const results = await Product.find({ category: { $in: [category]}})

        res.send(results);
        
    } catch (error) {
        next(error);
        console.log(error);
    }
});

module.exports = route;