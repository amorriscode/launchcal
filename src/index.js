/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');

// Setup requirements for getting raw launch data
const axios = require('axios');
const moment = require('moment');

const launchesService = app.service('launches');

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

process.on('nuxt:build:done', (err) => {
  if (err) {
    logger.error(err);
  }
  
  const server = app.listen(port);

  server.on('listening', () => {
    // launchesService.find().then((results) => {
    //   results.data.forEach((result) => {
    //     launchesService.remove(result._id);
    //   });
    // });

    // Grab raw launch data from 25 launches after the most recent launch
    launchesService.find({
      query: {
        $limit: 1,
        $sort: {
          isonet: -1,
        },
      }
    }).then((result) => {
      const lastLaunchDate = (result.total > 0) 
        ? moment(result.data[0].net, 'MMMMDDY').add(1, 'days').format('YYYY-MM-DD') 
        : moment().format('YYYY-MM-DD');
      
      logger.info(`Grabbing launch data after ${lastLaunchDate}`);

      axios.get(`https://launchlibrary.net/1.2/launch/${lastLaunchDate}`).then((results) => {
        results.data.launches.forEach((launch) => {
          launchesService.create(launch);
        });
      });
    });

    logger.info(`Feathers application started on ${app.get('host')}:${port}`);
  });
});
