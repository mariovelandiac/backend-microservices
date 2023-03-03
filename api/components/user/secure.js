const auth = require('../../../auth');

module.exports = function checkAuth(action) {

  function middleware (req, res, next) {
    switch(action) {
      case 'update':
        auth.check.own(req, req.body.id);
        next();
        break

      case 'logged':
        auth.check.logged(req);
        next();
          break

      default:
        next();
    }
  }

  return middleware
}
