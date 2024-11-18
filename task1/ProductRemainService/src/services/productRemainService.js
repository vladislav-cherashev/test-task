const pool = require( '../config/db' );

const getOneProduct = ( productId ) => {
    return pool.query( 'SELECT * FROM product WHERE id=$1', [ productId ] );
}

const createNewProduct = ( product ) => {
    console.log( product )
}

const updateProduct = ( productId, changes ) => {
    const { plu, name, countOnShelf, countInOrder, shopId } = changes;
    const result = pool.query(
        'UPDATE product SET plu=$1, name=$2, count_on_shelf=$3, count_in_order=$4, shop_id=$5 WHERE id=$0 RETURNING *',
        [ plu, name, countOnShelf, countInOrder, shopId, productId ]
    );
    return result;
}

module.exports = {
    getOneProduct,
    createNewProduct,
    updateProduct,
}