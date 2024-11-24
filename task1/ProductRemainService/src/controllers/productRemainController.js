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
    const { body: { filters } } = req;
    try {
        const filteredProducts = await productRemainService.getFilteredProducts( filters );
        res.status( 200 ).json( filteredProducts );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
};

const getFilteredStocks = async( req, res ) => {
    const { body: { filters } } = req;
    try {
        const filteredStocks = await productRemainService.getFilteredStocks( filters );
        res.status( 200 ).json( filteredStocks );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
};

const createProduct = async( req, res ) => {
    const { body } = req;
    const { plu, name } = body;
    if( !plu || !name ) {
        res.status( 400 ).send( 'Error: please enter a valid data' );
    } else {
        const newProduct = {
            plu, name
        }
        try {
            const createdProduct = await productRemainService.createNewProduct( newProduct );
            res.status( 200 ).json( createdProduct.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const createStocks = async( req, res ) => {
    const { body } = req;
    const { countOnShelf, countInOrder, shop } = body;
    if( !countOnShelf || !countInOrder || !shop ) {
        res.status( 400 ).send( 'Error: please enter a valid data' );
    } else {
        const newStocks = {
            countOnShelf,
            countInOrder,
            shopId: Math.floor( Math.random() * 1001 )
        }
        try {
            const createdStocks = await productRemainService.createNewStocks( newStocks );
            res.status( 200 ).json( createdStocks.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const increaseStocks = async( req, res ) => {
    const { body: { productId, amount } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    } else {
        await productRemainService.increaseStocks( productId, amount );
    }
}

const decreaseStocks = async( req, res ) => {
    const { body: { productId, amount } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    } else {
        await productRemainService.decreaseStocks( productId, amount );
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
    getFilteredStocks,
    getOneProduct,
    createProduct,
    createStocks,
    increaseStocks,
    decreaseStocks,
    updateProduct,
    deleteProduct,
}