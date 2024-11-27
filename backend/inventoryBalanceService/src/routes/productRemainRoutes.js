const express = require( 'express' );
const router = express.Router();
const productRemainController = require( '../controllers/productRemainController' );

router.get( '/', productRemainController.getAllProducts );
router.get( '/filteredProducts', productRemainController.getFilteredProducts );
router.get( '/stocks', productRemainController.getFilteredStocks );
router.get( '/:productId', productRemainController.getOneProduct );
router.post( '/', productRemainController.createProduct );
router.post( '/stocks', productRemainController.createStocks );
router.put( '/:productId', productRemainController.updateProductById );
router.put( '/stocks/increase', productRemainController.increaseStocks );
router.put( '/stocks/decrease', productRemainController.decreaseStocks );
router.delete( '/:productId', productRemainController.deleteProduct );

module.exports = router;