exports.errorMiddleware = (error, req, res, next) => {
  console.log('Error middleware', error);
  res.send('Error');
}
