// Transductor configurado de 0 200ºC

'use strict';

const mraa = require('mraa');

const iotDevice = require('./modules/iotDevice');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

let analogPin0 = new mraa.Aio(0); //setup access analog inpuput pin 0
let device = new iotDevice();
// let analogValue = analogPin0.read(); //read the value of the analog pin
// let analogValueFloat = analogPin0.readFloat(); //read the pin value as a float
// console.log(analogValue); //write the value of the analog pin to the console
// console.log(analogValueFloat.toFixed(5)); //write the value in the float format

/*
setInterval(() => {
  let analogValueFloat = analogPin0.readFloat() * 10.00;
  let temp = analogValueFloat * 20.00;
  
  console.log(`Temperatura = ${temp.toFixed(2)}`);
  console.log(__dirname);
}, 3000);
*/

setInterval(() => {
  let analogValueFloat = analogPin0.readFloat();
  let temp = analogValueFloat * 200.00;
  
  console.log(`Temperatura = ${temp.toFixed(0)}`);
  device.enviarDato(temp.toFixed(0), 0, false);
}, 3000);