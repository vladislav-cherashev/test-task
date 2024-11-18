const pool = require( '../config/db' );
const productRemainService = require( '../services/productRemainService' );

const getAllProducts = async( req, res ) => {
    const { query: { productId } } = req;
    if( !productId ) {
        try {
            const result = await pool.query( 'SELECT * FROM product' );
            res.status( 200 ).json( result.rows );
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
            const result = await pool.query(
                'INSERT INTO product (plu, name, count_on_shelf, count_in_order, shop_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
                [ plu, name, countOnShelf, countInOrder, shopId ]
            );
            res.status( 200 ).json( result.rows[ 0 ] );
        } catch( err ) {
            res.status( 500 ).json( err.message );
        }
    }
}

const updateProduct = async( req, res ) => {
    console.log( 'updateProduct>>>>>>>>>>>>>>>>>>>>>>>>' )
    const { body, params: { productId } } = req;
    console.log( productId )
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

const deleteProduct = ( req, res ) => {
    res.send( 'Delete product' );
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}