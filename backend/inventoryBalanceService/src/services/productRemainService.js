const utils = require( '../dataBase/utils' );
const axios = require( 'axios' );

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
    const filteredProducts = [];
    allProducts.rows.filter( item => {
        if( applyFilters( item, filters ) ) {
            filteredProducts.push( item );
        }
    } );
    return filteredProducts;
}

const getFilteredStocks = async( filters ) => {
    const result = [];
    let productId = 0;
    const { plu, shopId } = filters;
    if( plu ) {
        const allProducts = await utils.getAllProducts();
        allProducts.rows.filter( item => {
            if( applyFilters( item, filters ) ) {
                productId = item.id;
            }
        } );
        const stock = await utils.getStocksByProductId( productId );
        result.push( stock );
    }
    if( shopId ) {
        const stock = await utils.getStocksByShopId( shopId );
        result.push( stock );
    }
    return result;
}

const getFilteredStocksByCountOnShelf = async( filters ) => {
    const { countFrom, countFor } = filters;
    const allStocks = await utils.getAllStocks();
    const items = allStocks.rows.filter( item => {
        if( item.count_on_shelf >= countFrom && item.count_on_shelf <= countFor ) {
            return item;
        }
    } );
    return items;
}

const getFilteredStocksByCountInOrder = async( filters ) => {
    const { countFrom, countFor } = filters;
    const allStocks = await utils.getAllStocks();
    const items = allStocks.rows.filter( item => {
        if( item.count_in_order >= countFrom && item.count_in_order <= countFor ) {
            return item;
        }
    } );
    return items;
}

const increaseStocks = async( productId, target, amount ) => {
    const stocksInShop = await utils.getStocksByProductId( productId );
    const currentStock = stocksInShop.rows[ 0 ];
    const count = Number( amount );
    if( currentStock && !isNaN( count ) ) {
        switch( target ) {
            case 'countOnShelf':
                currentStock.count_on_shelf += count;
                break;
            case 'countInOrder':
                currentStock.count_in_order += count;
                break;
        }
        return utils.updateStockById( productId, currentStock );
    }
}

const decreaseStocks = async( productId, target, amount ) => {
    const stocksInShop = await utils.getStocksByProductId( productId );
    const currentStock = stocksInShop.rows[ 0 ];
    const count = Number( amount );
    if( currentStock && !isNaN( count ) ) {
        switch( target ) {
            case 'countOnShelf':
                currentStock.count_on_shelf -= count;
                break;
            case 'countInOrder':
                currentStock.count_in_order -= count;
                break;
        }
        return utils.updateStockById( productId, currentStock );
    }
}

const createNewProduct = ( product ) => {
    return utils.createNewProduct( product );
}

const createNewStock = ( product ) => {
    return utils.createNewStock( product );
}

const updateProductById = ( productId, changes ) => {
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
    getFilteredStocksByCountOnShelf,
    getFilteredStocksByCountInOrder,
    createNewProduct,
    createNewStock,
    increaseStocks,
    decreaseStocks,
    updateProductById,
    deleteProduct,
}