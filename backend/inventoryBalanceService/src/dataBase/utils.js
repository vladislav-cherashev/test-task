const pool = require( '../config/db' );

const getAllProducts = () => {
    return pool.query( 'SELECT * FROM product' );
}

const getAllStocks = ()=>{
    return pool.query( 'SELECT * FROM stocks' );
}

const getOneProduct = ( productId ) => {
    return pool.query( 'SELECT * FROM product WHERE id=$1', [ productId ] );
}

const createNewProduct = ( product ) => {
    const { name, plu } = product;
    const result = pool.query(
        'INSERT INTO product ( name, plu ) VALUES($1, $2) RETURNING *',
        [ name, plu ]
    );
    return result;
}

const createNewStock = ( stock ) => {
    const { shopId, productId, countOnShelf, countInOrder } = stock;
    const result = pool.query(
        'INSERT INTO stocks ( product_id, shop_id, count_on_shelf, count_in_order ) VALUES($1, $2, $3, $4) RETURNING *',
        [ productId, shopId, countOnShelf, countInOrder ]
    );
    return result;
}

const updateProduct = ( productId, changes ) => {
    const { pluNumber, name } = changes;
    const result = pool.query(
        'UPDATE product SET name=$2, plu=$3 WHERE id=$1 RETURNING *',
        [ productId, name, pluNumber ]
    );
    return result;
}

const getStocksByProductId = ( productId ) => {
    return pool.query( 'SELECT * FROM stocks WHERE product_id=$1', [ productId ] );
}

const getStocksByShopId = ( shopId ) => {
    return pool.query( 'SELECT * FROM stocks WHERE shop_id=$2', [ shopId ] );
}

const updateStockById = ( productId, changes ) => {
    const { count_on_shelf, count_in_order } = changes;
    const result = pool.query(
        'UPDATE stocks SET count_on_shelf=$2, count_in_order=$3 WHERE product_id=$1',
        [ productId, count_on_shelf, count_in_order ]
    );
    return result;
}

const deleteProduct = ( productId ) => {
    return pool.query( 'DELETE FROM product WHERE id=$1', [ productId ] );
}

module.exports = {
    getAllProducts,
    getAllStocks,
    getOneProduct,
    createNewProduct,
    createNewStock,
    getStocksByProductId,
    getStocksByShopId,
    updateProduct,
    updateStockById,
    deleteProduct,
}