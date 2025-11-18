const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000
//const db = require('./app/models');


// Routes for API
require('./app/route')(app); // configure our routes

app.listen(port, async () => {
    console.log(`Port ${port}`)
    //await db.checkConnection();
})

