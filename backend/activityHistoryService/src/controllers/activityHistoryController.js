const activityHistoryService = require( '../services/activityHistoryService' );

/**
 * Функция возврата истории по фильтрам
 * - shop_id
 * - plu
 * - date (с-по)
 * - action
 * @param res
 * @param req
 */
const getFilteredHistory = ( res, req ) => {

}

const createActivityHistory = async( res, req ) => {
    const { body: { productId, plu } } = req;
    try {
        const objectForSave = {
            productId,
            shopId: Math.floor( Math.random() * 1001 ),
            plu,
        }
        const activity = await activityHistoryService.createActivityHistory( objectForSave );
        res.status( 200 ).json( activity.rows[ 0 ] );
    } catch( err ) {
        res.status( 500 ).send( err.message );
    }
}

module.exports = {
    getFilteredHistory,
    createActivityHistory,
}