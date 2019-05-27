'use strict';

const path = require('path');

const shell = require('shelljs');

const schedule = require('./schedule');

const ejecutarCalendario = () => {
  const jobsSchudele = new schedule();

  jobsSchudele.jobTemperatura();
  jobsSchudele.jobStateShadow();
}

const ejecutarBashNtp = () => {
  const archivo = path.join(__dirname, 'setNtpd.sh');

  console.log(archivo);
  
  shell.exec(archivo);
}

module.exports = () => {
  ejecutarBashNtp();
  ejecutarCalendario();
}
