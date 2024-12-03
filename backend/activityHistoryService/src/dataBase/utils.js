const pool = require( '../config/db' );

const createHistoryObject = ( objectForSave ) => {
    const { shopId, productId, plu } = objectForSave;
    const date = new Date();
    const action = 'create';
    console.log( date );
    return pool.query(
        'INSERT INTO history_of_actions ( shop_id, product_id, plu, date, action ) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [ shopId, productId, plu, date, action ]
    );
}

module.exports = {
    createHistoryObject,
}
