require('dotenv').config()
const Express = require('express');
const BodyParser = require('body-parser')
const MethodOverride = require('method-override')
const db = require('./app/models');

const app = Express();

// parse application/json
app.use(BodyParser.json({
    limit:'5mb'
}));

// parse application/vnd.api+json as json
app.use(BodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(BodyParser.urlencoded({
    limit:'5mb',
    extended: true
}));

app.use(MethodOverride('X-HTTP-Method-Override'));

// >>>>>>>>>>>>>>>>>>>> route <<<<<<<<<<<<<<<<<<<<
require('./app/route')(app);

const port = process.env.PORT || 3000

async function startServer() {
    try {
        await db.sequelize.authenticate();
        console.log("Connected to Database");

        await db.sequelize.sync({ force: false }); 
        console.log("Sync DB successfully");

        app.listen(port, () => {
            console.log(`Server run at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("Cannot start server", error.message);
        process.exit(1); 
    }
}

startServer();