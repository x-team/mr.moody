var configResolver = require('./../configResolver.js');

exports.validateRequest = (req, res, next) => {
  if (req.body.user_name === configResolver.getConfigVariable('AUTH_USER')) {
    next();
    return;
  }

  error = new Error('invalid user')
  next(error);
}
