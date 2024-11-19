const pool = require( '../config/db' );

const getAllProducts = () => {
    return pool.query( 'SELECT * FROM product' );
}

const getOneProduct = ( productId ) => {
    return pool.query( 'SELECT * FROM product WHERE id=$1', [ productId ] );
}

const createNewProduct = ( product ) => {
    const result = pool.query(
        'INSERT INTO product (plu, name, count_on_shelf, count_in_order, shop_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [ plu, name, countOnShelf, countInOrder, shopId ]
    );
    return result;
}

const updateProduct = ( productId, changes ) => {
    const { plu, name, countOnShelf, countInOrder, shopId } = changes;
    const result = pool.query(
        'UPDATE product SET plu=$2, name=$3, count_on_shelf=$4, count_in_order=$5, shop_id=$6 WHERE id=$1 RETURNING *',
        [ productId, plu, name, countOnShelf, countInOrder, shopId ]
    );
    return result;
}

const deleteProduct = ( productId ) => {
    return pool.query('DELETE FROM product WHERE id=$1', [ productId ]);
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
}