'use strict';

const mraa = require('mraa');

const iotDevice = require('../providers/iotDevice');

const sendData = class {
  constructor () {
    this.temperaturaPin0 = new mraa.Aio(0); //setup access analog inpuput pin 0
    this.device = new iotDevice(); // crea el enlace mqtt
  }

  /*                      FUNCION PARA LEER Y ENVIAR DATOS
   * Se utililizo una Pt100 y un trasductor configurado de la siguiene forma:
   *    0°C   ->  0Vdc
   *    200°C ->  10Vdc
   * por lo tanto para utilizar el fator de conversio se uso regla de 3 o pendiente
   * y = mx, donde:
   * m = 200/10 = 20
   * Ademas la funcion readFloat() de mraa hay que multiplicarla por 10 ya que 
   * lee el voltaje con una decima de diferencia es decir:
   * voltaje enviado al Aio = 1.04
   * voltaje por readFloat () = 0.104
   * entonces 1.04/0.104 = 10
   * 
   * => Conversor = 20 * 10 = 200
   */
  leerYenviarTemperatura () {
    const conversor = 200.00;
    let analogValueFloat = this.temperaturaPin0.readFloat(); //read the value of the analog pin
    let temperatura = analogValueFloat * conversor; // temperatura en grados centigrados
    
    temperatura = temperatura.toFixed(2); // redondea a dos cifras decimales
    console.log(`temperatura: ${temperatura}°C`)
    device.enviarDato(temperatura, 0, false); // envia temperatura sin guardar
  }
}

module.exports = sendData