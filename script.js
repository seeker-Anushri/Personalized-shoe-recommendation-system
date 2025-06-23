const socket = new WebSocket('ws://localhost:8081');

socket.onopen = () => {
  document.getElementById('status').textContent = ' Connected to WebSocket server';
  console.log('WebSocket connection established');
};

socket.onclose = () => {
  document.getElementById('status').textContent = 'Connection closed';
  console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
  document.getElementById('status').textContent = 'WebSocket error occurred';
  console.error('WebSocket Error:', error);
};

socket.onmessage = (event) => {
  const sensorData = event.data.split(',');

  let sensor1 = NaN, sensor2 = NaN, sensor3 = NaN, sensor4 = NaN;

  sensorData.forEach((data) => {
    const [sensor, value] = data.split(':').map(item => item.trim());
    if (sensor && value) {
      switch (sensor) {
        case 'S1': sensor1 = parseFloat(value); break;
        case 'S2': sensor2 = parseFloat(value); break;
        case 'S3': sensor3 = parseFloat(value); break;
        case 'S4': sensor4 = parseFloat(value); break;
      }
    }
  });

  document.getElementById('data').innerHTML = `
    <div>Sensor 1 (Forefoot): ${sensor1}</div>
    <div>Sensor 2 (Midfoot): ${sensor2}</div>
    <div>Sensor 3 (Forefoot): ${sensor3}</div>
    <div>Sensor 4 (Rearfoot): ${sensor4}</div>
  `;

  document.getElementById('flatfoot-solutions').style.display = 'none';
  document.getElementById('higharch-solutions').style.display = 'none';
  document.getElementById('normalfoot-solutions').style.display = 'none';

  let footType = 'Unclassified Foot Type';
  let footClass = 'unclassified';

  if (isNaN(sensor1) || isNaN(sensor2) || isNaN(sensor3) || isNaN(sensor4)) {
    footType = 'Error - Sensor Data Missing';
  }
  else if (
    sensor2 >= 1900 && sensor2 <= 5000 &&
    sensor1 > 700 && sensor3 > 700 && sensor4 > 700
  ) {
    footType = 'Flatfoot';
    footClass = 'flatfoot';
    document.getElementById('flatfoot-solutions').style.display = 'block';
  }
  else if (
    sensor2 < 300 &&
    sensor1 > 800 && sensor3 > 800 && sensor4 > 800
  ) {
    footType = 'High Arch';
    footClass = 'higharch';
    document.getElementById('higharch-solutions').style.display = 'block';
  }
  else if (
    sensor2 >= 300 && sensor2 < 1900 &&
    sensor1 > 700 && sensor3 > 700 && sensor4 > 700
  ) {
    footType = 'Normal Foot';
    footClass = 'normal';
    document.getElementById('normalfoot-solutions').style.display = 'block';
  }

  document.getElementById('foot-type').textContent = `Foot type: ${footType}`;
  document.getElementById('foot-type').className = `foot-type ${footClass}`;

  // Show relevant shoe image section
  updateShoeImages(footType);
};

function updateShoeImages(footType) {
  document.getElementById('flatfoot-images').style.display = 'none';
  document.getElementById('higharch-images').style.display = 'none';
  document.getElementById('normalfoot-images').style.display = 'none';

  if (footType === 'Flatfoot') {
    document.getElementById('flatfoot-images').style.display = 'block';
  } else if (footType === 'High Arch') {
    document.getElementById('higharch-images').style.display = 'block';
  } else if (footType === 'Normal Foot') {
    document.getElementById('normalfoot-images').style.display = 'block';
  }
}

function downloadPDF() {
  const now = new Date();
  document.getElementById('timestamp').textContent = now.toLocaleString();

  let visibleSection = null;
  if (document.getElementById('flatfoot-solutions').style.display === 'block') {
    visibleSection = document.getElementById('flatfoot-solutions');
  } else if (document.getElementById('higharch-solutions').style.display === 'block') {
    visibleSection = document.getElementById('higharch-solutions');
  } else if (document.getElementById('normalfoot-solutions').style.display === 'block') {
    visibleSection = document.getElementById('normalfoot-solutions');
  }

  const clone = document.createElement('div');
  clone.style.width = '800px';
  clone.style.padding = '20px';
  clone.style.backgroundColor = 'white';

  clone.appendChild(document.getElementById('report-header').cloneNode(true));
  if (visibleSection) {
    clone.appendChild(visibleSection.cloneNode(true));
  } else {
    clone.innerHTML += '<p>No foot type classified.</p>';
  }

  const opt = {
    margin: 0.5,
    filename: 'foot_pressure_report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, scrollY: 0 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(clone).save();
}
