const router = require('express').Router();
const productController = require('../controllers/productController.js');
const auth = require('../middleware/auth.js');
const authAdmin = require('../middleware/authAdmin.js');

router
  .route('/products')
  .get(productController.getProduct)
  .post(productController.createProduct);

router
  .route('/products/:id')
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);

module.exports = router;
