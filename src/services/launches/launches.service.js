// Initializes the `launches` service on path `/launches`
const createService = require('feathers-nedb');
const createModel = require('../../models/launches.model');
const hooks = require('./launches.hooks');
const filters = require('./launches.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'launches',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/launches', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('launches');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
