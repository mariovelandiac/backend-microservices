
const userRouter = require('../api/components/user/user.network');
const authRouter = require('../api/components/auth/auth.network')
const postRouter = require('../api/components/post/post.network')

function routerApi(app) {
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/post', postRouter);
}


module.exports = routerApi
