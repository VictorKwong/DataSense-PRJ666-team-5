# Changelog

All notable changes to this project will be documented in this file.


## Sprint-1

### Team changes

- New team members onboarded and familiarized with project documentation.
- Development environment set up for all team members, including GitHub repositories, CI/CD pipelines, 
  and task management.
### Added
- Node.js Express server setup with `GET /sensor-data` and `POST /sensor-data` routes for processing sensor data.
- WebSocket setup: allows the server and the frontend to establish WebSocket connection (helps the server to share the newly received sensor data with the frontend in real time).
- In-memory storage (in the form of the .csv file) to store the sensor data.
- Thonny IDE Setup for Sensor Data Acquisition and Transmission:
    -Thonny IDE used to write and upload MicroPython scripts to the Raspberry Pi.
    -Code developed to interface with sensors (e.g., DHT11 for temperature and humidity) and collect 
     data in real time.
    -Established Wi-Fi connection using the Raspberry Pi Pico W to enable the transmission of sensor 
     data to the server over HTTP.
    -Successfully sent sensor data to the server’s /sensor-data endpoint via Wi-Fi, using HTTP POST 
     requests.
    -Basic error handling implemented to ensure reliable data transmission in case of network issues.
 - Frontend UI Development:
    -Basic user interface (UI) created using React/Next.js.
    -Dashboard designed to display sensor data (temperature, humidity, and moisture) 
     received via WebSocket connection.
    -UI components added for displaying sensor data in a table format
    -Responsive design implemented to ensure compatibility with desktop and mobile devices.
