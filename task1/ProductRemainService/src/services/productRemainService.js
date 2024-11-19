const pool = require( '../config/db' );
const utils = require( '../dataBase/utils' );
const wasi = require( 'node:wasi' );

const applyFilters = ( item, filters ) => {
    return Object.keys( filters ).every( key => item[ key ] === filters[ key ] );
};

const getAllProducts = () => {
    return utils.getAllProducts();
}

const getOneProduct = ( productId ) => {
    return utils.getOneProduct( productId );
}

const getFilteredProducts = async( filters ) => {
    const allProducts = await utils.getAllProducts();
    return Object.values( allProducts ).filter( stock => applyFilters( stock, filters ) );
}

const createNewProduct = ( product ) => {
    return utils.createNewProduct( product );
}

const updateProduct = ( productId, changes ) => {
    return utils.updateProduct( productId, changes );
}

const deleteProduct = ( productId ) => {
    return utils.deleteProduct( productId );
}

module.exports = {
    getAllProducts,
    getOneProduct,
    getFilteredProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
}