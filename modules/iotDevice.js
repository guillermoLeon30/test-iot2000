const config = require('../certs-iot/config')
const moment = require('moment')
const uniqid = require('uniqid')
const devices = require('aws-iot-device-sdk').device

const iotDevice = class {
  constructor () {
    this.device = devices({
      keyPath: config.privateKey,
      certPath: config.clientCert,
      caPath: config.caCert,
      clientId: uniqid('d-'),
      host: config.host
    })
    this.device.on('connect', () => {
      this.device.subscribe('prueba/maquina');
    })
  }
 
  enviarDato (temperatura, presion, save) {
    this.device.publish('prueba/maquina', JSON.stringify({
      modelo: 'AC-563',
      tiempo: moment().unix(),
      save: save,
      sensor: [
        {
          modelo: '7843',
          valor: temperatura
        },
        {
          modelo: '1234',
          valor: presion
        }
      ]
    }));
  }
}

module.exports = iotDevice
