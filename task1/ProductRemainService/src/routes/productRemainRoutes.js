const express = require( 'express' );
const router = express.Router();
const productRemainController = require( '../controllers/productRemainController' );

router.post( '/', productRemainController.createProduct );
router.post( '/stocks', productRemainController.createStocks );
router.get( '/products', productRemainController.getFilteredProducts );
router.get( '/stocks', productRemainController.getFilteredStocks );
// router.get( '/:productId', productRemainController.getOneProduct );
router.put( '/:productId', productRemainController.updateProduct );
router.delete( '/:productId', productRemainController.deleteProduct );

module.exports = router;