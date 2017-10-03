exports.validateRequest = (req, res, next) => {
  if (req.url === '/votes') {
    next()
    return;
  }
  if (req.body.user_name === process.env.AUTH_USER) {
    next();
    return;
  }

  error = new Error('invalid user')
  next(error);
}
