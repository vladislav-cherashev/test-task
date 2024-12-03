const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const pool = require( './config/db' );
const activityHistoryRoutes = require( './routes/activityHistoryRoutes' );

const app = express();

app.use( bodyParser.json() );
app.use( '/activityHistory', activityHistoryRoutes );

pool.query( 'SELECT NOW()', ( err, res ) => {
    if( err ) {
        console.error( 'Error connecting to the database', err.stack );
    } else {
        console.log( 'Connected to the database:', res.rows );
    }
} );

const port = process.env.PORT || 5001;
app.listen( port, () => {
    console.log( `API is listening on port ${ port }` );
} );