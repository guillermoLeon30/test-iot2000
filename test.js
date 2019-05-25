let reported = {};

let signals = {
  cambio: {
    cambiaDI0: false,
    cambiaDI1: true,
    cambiaDI2: true,
    cambiaDI3: false,
    cambiaDI4: false
  },
  lectura: {
    DI0: false,
    DI1: true,
    DI2: false,
    DI3: true,
    DI4: false
  }
}

if (signals.cambio.cambiaDI0) reported['bomba'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI1) reported['bomba2'] = signals.lectura.DI1;
if (signals.cambio.cambiaDI2) reported['Val1In'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI3) reported['Val1Out'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI4) reported['Val2in'] = signals.lectura.DI0;

let data = {
  'state': {
    'reported': reported
  }
}

console.log(data);

if (signals.cambio.cambiaDI0) reported['bomba'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI1) reported['bomba2'] = signals.lectura.DI1;
if (signals.cambio.cambiaDI2) reported['Val1In'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI3) reported['Val1Out'] = signals.lectura.DI0;
if (signals.cambio.cambiaDI4) reported['Val2in'] = signals.lectura.DI0;

data = {
  'state': {
    'reported': reported
  }
}

console.log(data);