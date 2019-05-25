/*
*   *    *    *    *    *    *
*   ┬    ┬    ┬    ┬    ┬    ┬
*   │    │    │    │    │    │
*   │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
*   │    │    │    │    └───── month (1 - 12)
*   │    │    │    └────────── day of month (1 - 31)
*   │    │    └─────────────── hour (0 - 23)
*   │    └──────────────────── minute (0 - 59)
*   └───────────────────────── second (0 - 59, OPTIONAL)
*/

'use strict';

const nodeSchedule = require('node-schedule');

const sendData = require('../jobs/sendData');

const schedule = class {
  constructor () {
    this.jobSendData = new sendData();
  }

  jobTemperatura () {
    nodeSchedule.scheduleJob('3 * * * * *', () => {
      this.jobSendData.leerYenviarTemperatura();
    });
  }
}
 
module.exports = schedule;