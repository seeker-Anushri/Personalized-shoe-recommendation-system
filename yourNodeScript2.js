const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const admin = require('firebase-admin');
const fs = require('fs');

// Firebase setup
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// WebSocket server
const wss = new WebSocket.Server({ port: 8081 }, () => {
  console.log(' WebSocket server started on ws://localhost:8081');
});

// SerialPort setup
const portName = 'COM3'; 
const port = new SerialPort({ path: portName, baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

// Arduino data handling
parser.on('data', async (data) => {
  console.log('Data from Arduino:', data.trim());

  // Parse sensor values
  const sensorMap = {};
  const pairs = data.trim().split(',');
  pairs.forEach(pair => {
    const [key, val] = pair.split(':').map(s => s.trim());
    if (key && val) sensorMap[key] = parseFloat(val);
  });

  const { S1 = NaN, S2 = NaN, S3 = NaN, S4 = NaN } = sensorMap;

  // Classify foot type
  let footType = 'Unclassified';
  if (isNaN(S1) || isNaN(S2) || isNaN(S3) || isNaN(S4)) {
    footType = 'Error - Missing Sensor Data';
  } else if (S2 >= 1900 && S2 <= 5000 && S1 > 700 && S3 > 700 && S4 > 700) {
    footType = 'Flatfoot';
  } else if (S2 < 300 && S1 > 800 && S3 > 800 && S4 > 800) {
    footType = 'High Arch';
  } else if (S2 >= 300 && S2 < 1900 && S1 > 700 && S3 > 700 && S4 > 700) {
    footType = 'Normal Foot';
  }

  // Send to WebSocket clients
  const clientData = `S1:${S1}, S2:${S2}, S3:${S3}, S4:${S4}, FootType:${footType}`;
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(clientData);
    }
  });

  // Store in Firestore
  try {
    await db.collection('footPressureLogs').add({
      timestamp: admin.firestore.Timestamp.now(),
      sensors: { S1, S2, S3, S4 },
      footType,
    });
    console.log('Data stored in Firestore');
  } catch (err) {
    console.error(' Firestore Error:', err);
  }
});

// WebSocket client connection
wss.on('connection', (ws) => {
  console.log('🔗 New WebSocket client connected');
  ws.send('Connected to WebSocket server');
});
