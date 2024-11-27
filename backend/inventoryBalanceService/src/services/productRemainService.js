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
            console.log( item )
            return item;
        }
    } );
}

const getFilteredStocks = async( filters ) => {
    const allProducts = await utils.getAllProducts();
    return allProducts.rows.filter( item => {
        if( applyFilters( item, filters ) ) {
            const productId = item.id;
            return utils.getStockById( productId );
        }
    } );
}

const increaseStocks = async( productId, target, amount ) => {
    const stocksInShop = await utils.getStockById( productId );
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
    const stocksInShop = await utils.getStockById( productId );
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
    createNewProduct,
    createNewStock,
    increaseStocks,
    decreaseStocks,
    updateProductById,
    deleteProduct,
}