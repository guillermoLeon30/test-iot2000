const thingShadow = require('aws-iot-device-sdk').thingShadow;
const uniqid = require('uniqid');

const config = require('../../config/mqtt-iot');

const iotShadow = class {
  constructor () {
    this.thingShadows = thingShadow({
      keyPath: config.privateKey,
      certPath: config.clientCert,
      caPath: config.caCert,
      clientId: uniqid('s-'),
      host: config.host
    })
    this.thingShadows.on('connect', () => {
      this.thingShadows.register(config.thingName, { persistentSubscribe: true /* ignoreDeltas: true */}) // eslint-disable-line
    })
  }

  /**
   * Funcion para actualizar la sombra de un objeto iot
   * utiliza la Data con el formato que se hace en la funcion createFormatDate(signals)
   */
  updateData(formatData) {
    this.thingShadows.update(config.thingName, formatData)
  }

  /**
   * Funcion para crear un objeto que se enviara a la sombra para que esta cambie los estados
   * Esta hecha segun el formato siguiente:
   * {
   *  "state": { 
   *    "reported" : {
   *      "color" : { "r" :255, "g": 255, "b": 0 }    
   *    }
   *  } 
   * }
   * 
   * In: objet
   * Out: object
   */
  static createFormatData (signals) {
    let reported = {};

    if (signals.cambio.cambiaDI0) reported['bomba'] = signals.lectura.DI0;
    if (signals.cambio.cambiaDI1) reported['bomba2'] = signals.lectura.DI1;
    if (signals.cambio.cambiaDI2) reported['valvula1In'] = signals.lectura.DI2;
    if (signals.cambio.cambiaDI3) reported['valvula1Out'] = signals.lectura.DI3;
    if (signals.cambio.cambiaDI4) reported['valvula2In'] = signals.lectura.DI4;

    return {
      'state': {
        'reported': reported
      }
    };
  }

  setBomba1 (estado) {
    var data = {
      'state': {
        'reported': {
          'bomba': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setBomba2 (estado) {
    var data = {
      'state': {
        'reported': {
          'bomba2': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setValvula1In (estado) {
    var data = {
      'state': {
        'reported': {
          'valvula1In': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setValvula1Out (estado) {
    var data = {
      'state': {
        'reported': {
          'valvula1Out': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setValvula2In (estado) {
    var data = {
      'state': {
        'reported': {
          'valvula2In': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setValvula2Out (estado) {
    var data = {
      'state': {
        'reported': {
          'valvula2Out': estado
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }

  setTanque (value) {
    var data = {
      'state': {
        'reported': {
          'tanque': value
        }
      }
    }

    this.thingShadows.update(config.thingName, data)
  }
}

module.exports = iotShadow;
