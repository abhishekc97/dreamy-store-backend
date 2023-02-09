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
route.get("/getProducts", async function(req, res, next) {
    try {
        const category = req.query.category;
        if(!category) res.status(400).send("Bad request, check given parameters");

        const brand = req.query.brand;
        const color = req.query.color;
        const price = req.query.price;
        const freeshipping = req.query.freeshipping;

        const query = {};
        if(category) {
            query.category = { $in: [new RegExp(`^${category}$`, "i")] };
        }
        if(brand) {
            query.brand = { $in: [new RegExp(`^${brand}$`, "i")] } ;
        }
        if(color) {
            query.colors = { $in: [new RegExp(`^${color}$`, "i")]};
        }
        if(price) {
            query.price = { $lte: price};
        }
        if(freeshipping) {
            query.freeshipping = freeshipping;
        }
        console.log(query);

        // const results = await Product.find({ category: { $in: [category]}});
        // const results = await Product.find({ category: { $in: [new RegExp(`^${category}$`, "i")] }});
        if(category === "all") {
            const queryAll = {};
            
            if(brand) {
                queryAll.brand = { $in: [new RegExp(`^${brand}$`, "i")] } ;
            }
            if(color) {
                queryAll.colors = { $in: [new RegExp(`^${color}$`, "i")]};
            }
            if(price) {
                queryAll.price = { $lte: price};
            }
            if(freeshipping) {
                queryAll.freeshipping = freeshipping;
            }
            console.log("queryall", queryAll);

            const results = await Product.find(queryAll);
            
            console.log(results);
            res.json(results);
        } else {
            const results = await Product.find(query);

            console.log(results);
            res.json(results);
        }
        
    } catch (error) {
        next(error);
        console.log(error);
    }
});

module.exports = route;