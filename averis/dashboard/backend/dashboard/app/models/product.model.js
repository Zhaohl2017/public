module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.INTEGER
    }
  });

  return Product;
};