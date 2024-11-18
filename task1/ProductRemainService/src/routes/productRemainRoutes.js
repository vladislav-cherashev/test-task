const express = require( 'express' );
const router = express.Router();
const productRemainController = require( '../controllers/productRemainController' );

router.get( '/', productRemainController.getAllProducts );
router.get( '/:productId', productRemainController.getOneProduct );
router.post( '/', productRemainController.createProduct );
router.patch( '/:productId', productRemainController.updateProduct );
router.delete( '/:productId', productRemainController.deleteProduct );

module.exports = router;