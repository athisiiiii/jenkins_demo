// connect to the DB
import './data/index.js';

import express from 'express';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';
import HttpError from './utils/HttpError.js';

const app = express();

// extracts JSON data from request body and sets it up on req.body
app.use( express.json() );

// extracts JSON data from a form and sets it up on req.body
app.use( express.urlencoded() );

// app.get( '/products', ( req, res ) => {
//     res.send( 'I will send products' );
// })

app.use( productsRouter );
app.use( usersRouter );

app.use(( req, res, next ) => {
    const httpError = new HttpError( 'Resource not found', 404 );
    next( httpError );
});

// error-handling middleware
app.use(( httpError, req, res, next ) => {
    res.status( httpError.statusCode ).json({
        message: httpError.message
    });
});

const PORT = process.env.PORT || 4000;

app.listen( PORT, err => {
    if( err ) {
        console.log( error.message );
        return;
    }

    console.log( `Started http://localhost:${PORT}` );
});