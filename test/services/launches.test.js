const assert = require('assert');
const app = require('../../src/app');

describe('\'launches\' service', () => {
  it('registered the service', () => {
    const service = app.service('launches');

    assert.ok(service, 'Registered the service');
  });
});
