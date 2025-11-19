const userAuthRoute = require('./routes/user.route')

module.exports = function (app) {
    app.use('/v1/auth/users', userAuthRoute);
};