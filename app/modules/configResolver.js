var config = require('config');

exports.getConfigVariable = (variableName) => {
  if (config.has('env_variables.' + variableName)) {
    return config.get('env_variables.' + variableName);
  } else {
    return process.env[variableName];
  }
}
