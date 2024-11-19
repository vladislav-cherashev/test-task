const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const app = express();
app.use( bodyParser.json() );

let products = {};
let stocks = {};

app.post( '/products', ( req, res ) => {
    const product = req.body;
    products[ product.plu ] = product;
    res.status( 201 ).json( product );
} );

app.post( '/stocks', ( req, res ) => {
    const stock = req.body;
    stocks[ stock.plu ] = stock;
    res.status( 201 ).json( stock );
} );

app.patch( '/stocks/increase', ( req, res ) => {
    const { plu, amount } = req.body;
    if( stocks[ plu ] ) {
        stocks[ plu ].quantity_on_shelf += amount;
        res.json( stocks[ plu ] );
    } else {
        res.status( 404 ).send( 'Stock not found' );
    }
} );

app.patch( '/stocks/decrease', ( req, res ) => {
    const { plu, amount } = req.body;
    if( stocks[ plu ] ) {
        stocks[ plu ].quantity_on_shelf -= amount;
        res.json( stocks[ plu ] );
    } else {
        res.status( 404 ).send( 'Stock not found' );
    }
} );

app.get( '/stocks', ( req, res ) => {
    const filters = req.query;
    const filteredStocks = Object.values( stocks ).filter( stock => applyFilters( stock, filters ) );
    res.json( filteredStocks );
} );

app.get( '/products', ( req, res ) => {
    const filters = req.query;
    const filteredProducts = Object.values( products ).filter( product => applyFilters( product, filters ) );
    res.json( filteredProducts );
} );

const applyFilters = ( item, filters ) => {
    return Object.keys( filters ).every( key => item[ key ] === filters[ key ] );
};

const PORT = 3000;
app.listen( PORT, () => {
    console.log( `Server is running on port ${ PORT }` );
} );
