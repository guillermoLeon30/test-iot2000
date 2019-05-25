'use strict';

const mraa = require('mraa');

const iot2000 = class {
  constructor () {
    console.log('cargando mraa');
    this.temperaturaPin0 = new mraa.Aio(0); //setup access analog inpuput pin 0

    // Setup digital input
    this.digitalPin0 = new mraa.Gpio(12);
    this.digitalPin1 = new mraa.Gpio(11);
    this.digitalPin2 = new mraa.Gpio(10);
    this.digitalPin3 = new mraa.Gpio(9);
    this.digitalPin4 = new mraa.Gpio(4);

    this.digitalPin0.dir(mraa.DIR_IN);
    this.digitalPin1.dir(mraa.DIR_IN);
    this.digitalPin2.dir(mraa.DIR_IN);
    this.digitalPin3.dir(mraa.DIR_IN);
    this.digitalPin4.dir(mraa.DIR_IN);

    this.DI0 = 0;
    this.DI1 = 0;
    this.DI2 = 0;
    this.DI3 = 0;
    this.DI4 = 0;
    // end setup digital input
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
   * 
   * OUT: float
   */
  leerTemperatura () {
    const conversor = 200.00;
    let analogValueFloat = this.temperaturaPin0.readFloat(); //read the value of the analog pin
    let temperatura = analogValueFloat * conversor; // temperatura en grados centigrados
    
    return temperatura.toFixed(2); // redondea a dos cifras decimales
  }

  /**
   * Funcion que lee las entradas digitales del iot2000
   * 
   * IN:
   * OUT object {{boolean}, {boolean}}
   */
  leerEntradasDigitales () {
    let hayCambio = false;

    let DI0 = this.digitalPin0.read();
    let DI1 = this.digitalPin1.read();
    let DI2 = this.digitalPin2.read();
    let DI3 = this.digitalPin3.read();
    let DI4 = this.digitalPin4.read();

    let cambiaDI0 = DI0 !== this.DI0;
    let cambiaDI1 = DI1 !== this.DI1;
    let cambiaDI2 = DI2 !== this.DI2;
    let cambiaDI3 = DI3 !== this.DI3;
    let cambiaDI4 = DI4 !== this.DI4;

    if (cambiaDI0) this.DI0 = DI0;
    if (cambiaDI1) this.DI1 = DI1;
    if (cambiaDI2) this.DI2 = DI2;
    if (cambiaDI3) this.DI3 = DI3;
    if (cambiaDI4) this.DI4 = DI4;

    if (cambiaDI0 || cambiaDI1 || cambiaDI2 || cambiaDI3 || cambiaDI4) hayCambio = true;

    return {
      hayCambio: hayCambio,
      cambio: {
        cambiaDI0: cambiaDI0,
        cambiaDI1: cambiaDI1,
        cambiaDI2: cambiaDI2,
        cambiaDI3: cambiaDI3,
        cambiaDI4: cambiaDI4
      },
      lectura: {
        DI0: DI0 === 1,
        DI1: DI1 === 1,
        DI2: DI2 === 1,
        DI3: DI3 === 1,
        DI4: DI4 === 1
      }
    }
  }
}

module.exports = iot2000;