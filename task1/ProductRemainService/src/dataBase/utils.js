const pool = require( '../config/db' );

const getAllProducts = () => {
    return pool.query( 'SELECT * FROM product' );
}

const getOneProduct = ( productId ) => {
    return pool.query( 'SELECT * FROM product WHERE id=$1', [ productId ] );
}

const createNewProduct = ( product ) => {
    const { name, plu } = product;
    const result = pool.query(
        'INSERT INTO product ( name, plu ) VALUES($1, $2, $3) RETURNING *',
        [ name, plu ]
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

const getStocks = ( filter ) => {
    return pool.query( 'SELECT count_on_shelf FROM shop WHERE id=$1', [ filter ] );
}

const updateStocks = ( productId, changes ) => {
    const { count_on_shelf, count_in_order } = changes;
    const result = pool.query(
        'UPDATE shop SET count_on_shelf=$2, count_in_order=$3 WHERE product_id=$1',
        [ productId, count_on_shelf, count_in_order ]
    );
    return result;
}

const deleteProduct = ( productId ) => {
    return pool.query( 'DELETE FROM product WHERE id=$1', [ productId ] );
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    getStocks,
    updateProduct,
    updateStocks,
    deleteProduct,
}