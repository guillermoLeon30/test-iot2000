const path = require('path')

module.exports = {
  host: 'a39cpvubvptkow-ats.iot.us-west-2.amazonaws.com',
  port: 8883,
  clientId: 'RaspGateWay',
  thingName: 'Bomba1',
  caCert: path.join(__dirname, '..', 'certs-iot', 'x509.pem'),
  clientCert: path.join(__dirname, '..', 'certs-iot', 'certificate.pem.crt'),
  privateKey: path.join(__dirname, '..', 'certs-iot', 'private.pem.key'),
  protocol: 'mqtts',
  testMode: 1,
  baseReconnectTimeMs: 4000, /* milliseconds */
  keepAlive: 300, /* seconds */
  delay: 4000, /* milliseconds */
  Debug: false,
  region: 'us-west-2'
}
