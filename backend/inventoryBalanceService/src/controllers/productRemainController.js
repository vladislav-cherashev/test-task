const productRemainService = require( '../services/productRemainService' );
const axios = require( 'axios' );

const createDefaultStocks = ( newProduct ) => {
    const newStock = {
        shopId      : Math.floor( Math.random() * 1001 ),
        productId   : newProduct.id,
        countOnShelf: 0,
        countInOrder: 0
    }
    productRemainService.createNewStock( newStock );
}

const createHistory = async( data ) => {
    await axios.post( 'http://localhost:5001/activityHistory/create', data );
}

const prepareDataForHistory = async( product ) => {
    const stocks = await productRemainService.getStocksByProductId( product.id );
    const currentStock = stocks.rows[ 0 ];
    const data = {
        shopId   : currentStock.shop_id,
        productId: product.id,
        plu      : product.plu,
    };
    await createHistory( data );
}

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
        res.status( 200 ).json( filteredStocks[ 0 ].rows[ 0 ] );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
};

const getFilteredStocksByCountOnShelf = async( req, res ) => {
    const { body: { filters } } = req;
    try {
        const filteredStocks = await productRemainService.getFilteredStocksByCountOnShelf( filters );
        res.status( 200 ).json( filteredStocks );
    } catch( err ) {
        res.status( 500 ).json( err.message );
    }
};

const getFilteredStocksByCountInOrder = async( req, res ) => {
    const { body: { filters } } = req;
    try {
        const filteredStocks = await productRemainService.getFilteredStocksByCountInOrder( filters );
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
            await createDefaultStocks( createdProduct.rows[ 0 ] );
            prepareDataForHistory( createdProduct.rows[ 0 ] );
            res.status( 200 ).json( createdProduct.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const createStocks = async( req, res ) => {
    const { body } = req;
    const { productId, countOnShelf, countInOrder, shop } = body;
    if( !productId || !countOnShelf || !countInOrder || !shop ) {
        res.status( 400 ).send( 'Error: please enter a valid data' );
    } else {
        const newStock = {
            shopId: Math.floor( Math.random() * 1001 ),
            productId,
            countOnShelf,
            countInOrder
        }
        try {
            const createdStocks = await productRemainService.createNewStock( newStock );
            res.status( 200 ).json( createdStocks.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const increaseStocks = async( req, res ) => {
    const { body: { productId, target, amount } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    } else {
        try {
            const stocks = await productRemainService.increaseStocks( productId, target, amount );
            res.status( 200 ).json( stocks.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const decreaseStocks = async( req, res ) => {
    const { body: { productId, target, amount } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    } else {
        try {
            const stocks = await productRemainService.decreaseStocks( productId, target, amount );
            res.status( 200 ).json( stocks.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const updateProductById = async( req, res ) => {
    const { body, params: { productId } } = req;
    if( !productId ) {
        return res.send( 'No productId' );
    }
    try {
        const updatedProduct = await productRemainService.updateProductById(
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
    getFilteredStocksByCountOnShelf,
    getFilteredStocksByCountInOrder,
    getOneProduct,
    createProduct,
    createStocks,
    increaseStocks,
    decreaseStocks,
    updateProductById,
    deleteProduct,
    prepareDataForHistory,
}