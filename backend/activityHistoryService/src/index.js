const express = require( 'express' );

const app = express();

app.get( '/', ( req, res ) => {
    res.send( 'Welcome to Node.js API' );
} );

const port = process.env.PORT || 5001;
app.listen( port, () => {
    console.log( `API is listening on port ${ port }` );
} );