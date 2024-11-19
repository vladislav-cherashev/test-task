const express = require( 'express' );
const router = express.Router();
const productRemainController = require( '../controllers/productRemainController' );

router.get( '/', productRemainController.getAllProducts );

// Получение остатков по фильтрам
router.get('/stocks',productRemainController.getFilteredProducts);

router.get( '/:productId', productRemainController.getOneProduct );
router.post( '/', productRemainController.createProduct );
router.put( '/:productId', productRemainController.updateProduct );
router.delete( '/:productId', productRemainController.deleteProduct );

module.exports = router;