const launches = require('./launches/launches.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(launches);
};
