const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const productRemainRoutes = require( './routes/productRemainRoutes' );
const pool = require( './config/db' );

const app = express();

app.use( bodyParser.json() );
app.use( '/products', productRemainRoutes );

pool.query( 'SELECT NOW()', ( err, res ) => {
    if( err ) {
        console.error( 'Error connecting to the database', err.stack );
    } else {
        console.log( 'Connected to the database:', res.rows );
    }
} );

const port = process.env.PORT || 5000;
app.listen( port, () => {
    console.log( `API is listening on port ${ port }` );
} );