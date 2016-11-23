var configResolver = require('./../../modules/configResolver.js');

exports.validateRequest = (req, res, next) => {
  if (req.body.user_name === configResolver.getConfigVariable('AUTH_USER')) {
    next();
    return;
  }

  error = new Error('invalid user')
  next(error);
}
