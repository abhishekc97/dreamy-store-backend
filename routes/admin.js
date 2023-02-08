const { Router } = require("express");
const route = Router();

const Category = require("../models/Category");
const Product = require("../models/Product");

// create a category
route.post("/createCategory", async function (req, res, next) {
    try {
        const categoryName = req.body.name;
        if(!categoryName) res.status(400).send("Bad request, check given parameters");

        const newCategory = {
            name: categoryName,
        }

        // find collection for a duplicate, do not use callback 
        const foundCategory = await Category.find({name: categoryName});
        
        // make new category accordingly
        if(foundCategory.length === 0) {
            await Category.create(newCategory);
            res.send("New category added");
            console.log("New category added");
            
        } else {   
            res.status(409).send("Bad request, resource with same name already exists");
        }
    } catch (error) {
        next(error);
        console.log(error);
    }
});

// create a product
route.post("/createProduct", async function(req, res, next) {
    try {
        const name = req.body.name;
        if(!name) res.status(400).send("Bad request, check given parameters, product must have name");
        const title = req.body.title;
        const description = req.body.description;
        const category = req.body.category;
        const brand = req.body.brand;
        const colors = req.body.colors;
        const price = req.body.price;
        const images = req.body.images;
        const reviews = req.body.reviews;
        const averageRating = req.body.averageRating;
        const availableUnits = req.body.availableUnits;
        const sku = req.body.sku;
        const url = req.body.url;

        const newProduct = {
            name: name,
            title: title,
            description: description,
            category: category,
            brand: brand,
            colors: colors,
            price: price,
            images: images,
            reviews: reviews,
            averageRating: averageRating,
            availableUnits: availableUnits,
            sku: sku,
            url: url,
        }
        const results = await Product.create(newProduct);

        if(results) {
            res.status(200).send("New product has been made");
            console.log("New product has been made");
        } 

    } catch (error) {
        next(error);
        console.log(error);
    }
});  

module.exports = route;