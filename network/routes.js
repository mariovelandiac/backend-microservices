
const userRouter = require('../api/components/user/user.network');
const authRouter = require('../api/components/auth/auth.network')


function routerApi(app) {
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
}


module.exports = routerApi
