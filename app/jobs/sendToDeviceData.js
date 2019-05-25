'use strict';

const iotDevice = require('../providers/iotDevice');
const iotShadow = require('../providers/iotShadow');
const iot2000 = require('../models/iot2000');

const sendToDeviceData = class {
  constructor () {
    this.iot2000 = new iot2000();
    this.iotDevice = new iotDevice();
    this.iotShadow = new iotShadow();
  }

  /**
   * Funcion que envia los datos de temperatura a la nube
   * 
   * In: save->boolean
   * Out: float
   */
  
  sendTemperatureData (save) {
    let temperatura = this.iot2000.leerTemperatura();

    this.iotDevice.enviarDato(temperatura, 0, save);

    return temperatura;
  }

  sendStateShadow () {
    let dataIot2000 = this.iot2000.leerEntradasDigitales();
    
    if (dataIot2000.hayCambio) {
      let formatData = iotShadow.createFormatData(dataIot2000);

      this.iotShadow.updateData(formatData);

      return formatData;
    }
  }
}

module.exports = sendToDeviceData;