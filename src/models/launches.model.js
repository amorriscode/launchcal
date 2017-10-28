const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'launches.db'),
    autoload: true
  });

  // Don't allow duplicate launch entries (uses id from launchlibrary.com)
  // Model.ensureIndex({ fieldName: 'id', unique: true });

  return Model;
};
