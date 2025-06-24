# Personalized-shoe-recommendation-system
## A hardare-frontend-backend-cloud system that can accurately identify arch types (high, low) to recommend shoes with appropriate support.
![image](https://github.com/user-attachments/assets/a1f4bd75-5ab5-43e2-b8df-ccdf8b53a2a1)
![image](https://github.com/user-attachments/assets/5d254916-ffe1-4565-9e09-a9f80f6b519e)
### The project works by using Force Sensitive Resistors (FSRs) placed at key points under the foot to measure plantar pressure when a person stands on the sensor platform. These sensors convert the applied pressure into varying resistance values, which are read as voltage signals by an Arduino Uno microcontroller. The Arduino processes these signals, converts them to digital values ranging from 0 to 1023, and sends them to a Node.js backend via serial communication. The backend classifies the foot type—Flatfoot, High Arch, or Normal Foot—by comparing the sensor values to predefined thresholds. The results are displayed on a web interface using JavaScript and HTML, providing real-time feedback along with tailored shoe recommendations and medical suggestions. Simultaneously, the classified data is securely stored in Firebase, enabling long-term tracking and analysis of foot health

https://github.com/user-attachments/assets/701d199d-7314-4482-b237-732d886d9328

###
Live website- https://seeker-anushri.github.io/Personalized-shoe-recommendation-system/

The website is not showing output because the FSR sensor hardware and Arduino microcontroller are with the technician, disconnected from the system. The website requires real-time analog-to-digital sensor data via Serial Communication to process and display results. Once the technician takes the system to the patient and captures live foot pressure inputs, the website will instantly classify and display the output through the backend and frontend interface.

