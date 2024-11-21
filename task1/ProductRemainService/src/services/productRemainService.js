const utils = require( '../dataBase/utils' );

const applyFilters = ( item, filters ) => {
    return Object.keys( filters ).some( key => item[ key ] === filters[ key ] );
};

const getAllProducts = () => {
    return utils.getAllProducts();
}

const getOneProduct = ( productId ) => {
    return utils.getOneProduct( productId );
}

const getFilteredProducts = async( filters ) => {
    const allProducts = await utils.getAllProducts();
    return allProducts.rows.filter( item => {
        if( applyFilters( item, filters ) ) {
            return item;
        }
    } );
}

const getFilteredStocks = async( filters ) => {
    const allProducts = await utils.getAllProducts();
    let countStocks = {};
    return allProducts.rows.filter( item => {
        if( applyFilters( item, filters ) ) {
            return countStocks = {
                countOnShelf: item.countOnShelf,
                countInOrder: item.countInOrder
            };
        }
    } );
}

const increaseStocks = async( productId, amount ) => {
    const currentProduct = await utils.getOneProduct( productId ).rows[ 0 ];
    if( currentProduct ) {
        currentProduct.count_on_shelf += amount;
        currentProduct.count_in_order += amount;
        utils.updateProduct( productId, currentProduct );
    }
}

const decreaseStocks = async( productId, amount ) => {
    const currentProduct = await utils.getOneProduct( productId ).rows[ 0 ];
    if( currentProduct ) {
        currentProduct.count_on_shelf -= amount;
        currentProduct.count_in_order -= amount;
        utils.updateProduct( productId, currentProduct );
    }
}

const createNewProduct = ( product ) => {
    return utils.createNewProduct( product );
}

const createNewStocks = ( product ) => {
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
    getFilteredStocks,
    createNewProduct,
    createNewStocks,
    increaseStocks,
    decreaseStocks,
    updateProduct,
    deleteProduct,
}