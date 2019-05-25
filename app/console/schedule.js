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

const sendDataDevice = require('../jobs/sendToDeviceData');

const schedule = class {
  constructor () {
    this.sendDataDevice = new sendDataDevice();
  }

  jobTemperatura () {
    console.log('Iniciando job temperatura');
    
    nodeSchedule.scheduleJob('*/3 * * * * *', () => {
      let temperatura = this.sendDataDevice.sendTemperatureData(false);
      // let time = new Date().toTimeString();
      
      // console.log(`Tiempo: ${time}, Temp: ${temperatura}`);
    });
  }

  jobStateShadow () {
    console.log('Iniciando job Shadow');

    nodeSchedule.scheduleJob('*/2 * * * * *', () => {
      let data = this.sendDataDevice.sendStateShadow();
      // if (data) console.log(data);
    });
  }
}
 
module.exports = schedule;
