'use strict';

const schedule = require('./schedule');

module.exports = () => {
  const jobsSchudele = new schedule();

  jobsSchudele.jobTemperatura();
}
