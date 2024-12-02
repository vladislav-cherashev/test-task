const express = require( 'express' );
const axios = require('axios');
const bodyParser = require( 'body-parser' );
const pool = require( './config/db' );
const activityHistoryRoutes = require( './routes/activityHistoryRoutes' );

const app = express();

app.use( bodyParser.json() );
app.use( '/activityHistory', activityHistoryRoutes );

pool.query( 'SELECT NOW()', async( err, res ) => {
    const response = await axios.get( 'http://localhost:5000/products' );
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