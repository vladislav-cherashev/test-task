const utils = require( '../dataBase/utils' );

const createActivityHistory = ( objectForSave ) => {
    return utils.createHistoryObject( objectForSave );
}

const getFilteredHistory = () => {

}

module.exports = {
    createActivityHistory,
    getFilteredHistory,
}
