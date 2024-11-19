const productRemainService = require( '../services/productRemainService' );

const getAllProducts = async( req, res ) => {
    const { query: { productId } } = req;
    if( !productId ) {
        try {
            const allProducts = await productRemainService.getAllProducts();
            res.status( 200 ).json( allProducts.rows );
        } catch( err ) {
            res.status( 500 ).json( { error: err.message } );
        }
    } else {
        await getOneProduct( req, res );
    }
}

const getOneProduct = async( req, res ) => {
    const { query: { productId } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    }
    try {
        const oneProduct = await productRemainService.getOneProduct( productId );
        res.status( 200 ).json( oneProduct.rows[ 0 ] );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
}

const getFilteredProducts = async( req, res ) => {
    const { query: { filters } } = req;
    try {
        const filteredStocks = await productRemainService.getFilteredProducts( filters );
        res.status( 200 ).json( filteredStocks.rows );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
};

const createProduct = async( req, res ) => {
    const { body } = req;
    const { plu, name, countOnShelf, countInOrder, shopId } = body;
    if( !plu || !name || !countOnShelf || !countInOrder || !shopId ) {
        res.status( 400 ).send( 'Error: please enter a valid name' );
    } else {
        const newProduct = {
            plu, name, countOnShelf, countInOrder, shopId
        }
        try {
            const createdProduct = await productRemainService.createNewProduct( newProduct )
            res.status( 200 ).json( createdProduct.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const updateProduct = async( req, res ) => {
    const { body, params: { productId } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    }
    try {
        const updatedProduct = await productRemainService.updateProduct(
            productId,
            body
        );
        res.status( 200 ).json( updatedProduct.rows[ 0 ] );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
}

const deleteProduct = async( req, res ) => {
    const { params: { productId } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    }
    try {
        await productRemainService.deleteProduct(
            productId,
        );
        res.status( 204 ).send();
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
}

module.exports = {
    getAllProducts,
    getFilteredProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}