const motorcycleRouter = require('./motorcycleRoutes');
const accessoryRouter = require('./accessoryRoutes');
const sparepartRouter = require('./sparepartRoutes');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');

function route(app) {

    app.use('/api/v1/xe-may', motorcycleRouter)
    app.use('/api/v1/phu-kien', accessoryRouter)
    app.use('/api/v1/phu-tung', sparepartRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/user', userRouter)

}

module.exports = route;
