const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.country) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Product
  const product = {
    name: req.body.name,
    description: req.body.description ? req.body.description : null,
    country: req.body.country ? req.body.country : null,
    category: req.body.category ? req.body.category : null
  };

  // Save Product in the database
  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database (With conditions).
exports.findAll = (req, res) => {
  const country = req.query.country ? req.query.country : '';
  const category = req.query.category ? req.query.category : '';
  var conditions = null;

  if (country !== '' && category == '') {
    conditions = { country: { [Op.like]: `%${country}%` } };
  }
  if (country == '' && category !== '') {
    conditions = { category: { [Op.eq]: `${category}` } };
  }
  if (country !== '' && category !== '') {
    conditions = {
        [Op.and]: [
            { country: { [Op.like]: `%${country}%` } },
            { category: { [Op.eq]: `${category}` } }
        ]
    }
  }

  Product.findAll({ where: conditions })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, { where: { id: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({ where: {}, truncate: false })
    .then(nums => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all products."
      });
    });
};

// Product statistics.
exports.stats = (req, res) => {
  const country = req.query.country ? req.query.country : "";
  const category = req.query.category ? req.query.category : "";
  var conditions = "";

  if (country !== "" && category == "") {
    conditions = "WHERE country LIKE '%" + country + "%'";
  }
  if (country == "" && category !== "") {
    conditions = "WHERE category = " + category;
  }
  if (country !== "" && category !== "") {
    conditions = "WHERE country LIKE '%" + country + "%' AND category = " + category;
  }

  db.sequelize
    .query("SELECT category, count(1) FROM products " + conditions + " GROUP BY category ORDER BY category")
    .then(function(results) {
       res.json(results[0]);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while statsticing products."
      });
    });
};