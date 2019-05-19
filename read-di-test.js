"use strict";

const mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the console

let D0 = new mraa.Gpio(12); //setup digital read on pin 12
D0.dir(mraa.DIR_IN); //set the gpio direction to input

let D1 = new mraa.Gpio(11);
D1.dir(mraa.DIR_IN);

let D2 = new mraa.Gpio(10);
D2.dir(mraa.DIR_IN);

let D3 = new mraa.Gpio(9);
D3.dir(mraa.DIR_IN);

let D4 = new mraa.Gpio(4);
D4.dir(mraa.DIR_IN);

function periodicActivity() {
    let D0_val = D0.read(); //read the digital value of the pin
	let D1_val = D1.read();
	let D2_val = D2.read();
	let D3_val = D3.read();
	let D4_val = D4.read();
	
    console.log('D0: ' + D0_val + ' D1: ' + D1_val + ' D2: ' + D2_val + ' D3: ' + D3_val + ' D4: ' + D4_val);
}

setInterval(periodicActivity, 1000); //call the indicated function every 1 second (1000 milliseconds)
