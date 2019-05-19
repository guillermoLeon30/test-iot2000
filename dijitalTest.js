"use strict";

const mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

let myDigitalPin0 = new mraa.Gpio(12);
let myDigitalPin1 = new mraa.Gpio(11);
let myDigitalPin2 = new mraa.Gpio(10);
let myDigitalPin3 = new mraa.Gpio(9);
let myDigitalPin4 = new mraa.Gpio(4);

//set the gpio direction to input
myDigitalPin0.dir(mraa.DIR_IN);
myDigitalPin1.dir(mraa.DIR_IN);
myDigitalPin2.dir(mraa.DIR_IN);
myDigitalPin3.dir(mraa.DIR_IN);
myDigitalPin4.dir(mraa.DIR_IN);

function periodicActivity() {
  let myDigitalValue0 = myDigitalPin0.read();
  let myDigitalValue1 = myDigitalPin1.read();
  let myDigitalValue2 = myDigitalPin2.read();
  let myDigitalValue3 = myDigitalPin3.read();
  let myDigitalValue4 = myDigitalPin4.read();

  console.log(`
    ----------NUEVA LECTURA---------
    DI0 = ${myDigitalValue0}
    DI1 = ${myDigitalValue1}
    DI2 = ${myDigitalValue2}
    DI3 = ${myDigitalValue3}
    DI4 = ${myDigitalValue4}
  `);
}

setInterval(periodicActivity, 1000);