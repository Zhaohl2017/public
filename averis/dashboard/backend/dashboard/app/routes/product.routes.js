module.exports = app => {
    const controller = require("../controllers/product.controller.js");
    
    var router = require("express").Router();

    // Create a new Product
    router.post("/", controller.create);

    // Retrieve all Products
    router.get("/", controller.findAll);

    // Retrieve a single Product with id
    router.get("/:id", controller.findOne);

    // Update a Product with id
    router.put("/:id", controller.update);
    
    // Delete a Product with id
    router.delete("/:id", controller.delete);

    // Delete all Products
    router.delete("/", controller.deleteAll);

    app.use('/api/product', router);
    app.get('/api/dashboard', controller.stats);
  };