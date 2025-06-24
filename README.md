# Personalized-shoe-recommendation-system
## A hardare-frontend-backend-cloud system that can accurately identify arch types (high, low) to recommend shoes with appropriate support.
![image](https://github.com/user-attachments/assets/a1f4bd75-5ab5-43e2-b8df-ccdf8b53a2a1)
![image](https://github.com/user-attachments/assets/5d254916-ffe1-4565-9e09-a9f80f6b519e)
### The project works by using Force Sensitive Resistors (FSRs) placed at key points under the foot to measure plantar pressure when a person stands on the sensor platform. These sensors convert the applied pressure into varying resistance values, which are read as voltage signals by an Arduino Uno microcontroller. The Arduino processes these signals, converts them to digital values ranging from 0 to 1023, and sends them to a Node.js backend via serial communication. The backend classifies the foot type—Flatfoot, High Arch, or Normal Foot—by comparing the sensor values to predefined thresholds. The results are displayed on a web interface using JavaScript and HTML, providing real-time feedback along with tailored shoe recommendations and medical suggestions. Simultaneously, the classified data is securely stored in Firebase, enabling long-term tracking and analysis of foot health

https://github.com/user-attachments/assets/701d199d-7314-4482-b237-732d886d9328

###
Live website- https://seeker-anushri.github.io/Personalized-shoe-recommendation-system/

The website is currently not showing any output because the hardware subsystem, comprising the FSR 406 sensors, Arduino Uno microcontroller, and the complete pressure-sensing circuit, is physically with the technician and is not connected to the system. This hardware is responsible for generating real-time analog foot pressure data, which is converted to digital sensor readings (0-1023) via the Arduino's Analog-to-Digital Converters (ADC) and transmitted through Serial Communication Interface to the Node.js backend server. Once the technician takes the system to the patient and the patient places their foot on the FSR-based plantar pressure platform, the system will acquire real-time biomechanical data, classify foot deformities using threshold-based signal processing algorithms, and display live results on the frontend GUI via WebSocket communication and Firebase cloud integration.

