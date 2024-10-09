import network
import socket
import time
import machine
import dht
import json

# Function to connect to Wi-Fi
def connect_to_wifi(ssid, password):
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    # Wait for connection
    while not wlan.isconnected():
        time.sleep(1)
    print('Connected to Wi-Fi:', wlan.ifconfig())

# Function to read DHT11 sensor data and return JSON data
def read_sensor_data():
    dht_pin = machine.Pin(1)  # GPIO 1 (i.e., pin 2)
    dht_sensor = dht.DHT11(dht_pin)
    
    moisture_pin = machine.ADC(0)  # ADC pin for moisture sensor

    # Calibration values for moisture sensor
    dry_value = 2.73
    wet_value = 1.03

    try:
        # Read temperature and humidity
        dht_sensor.measure()
        temperature = dht_sensor.temperature()
        humidity = dht_sensor.humidity()

        # Read moisture level from sensor
        moisture_raw = moisture_pin.read_u16()  # Get ADC value (0-65535)
        
        # Convert moisture raw value to percentage
        moisture_percentage = max(0, min(100, ((dry_value - moisture_raw) / (dry_value - wet_value)) * 100))

        # Prepare data as JSON
        data = {
            "temperature": temperature,
            "humidity": humidity,
            "moisture": moisture_percentage
        }

        return data

    except Exception as e:
        print("Error reading sensor data:", str(e))
        return None

# Function to send JSON data over a socket
def send_json_data(server_ip, server_port, json_data):
    try:
        # Convert the JSON object to a string
        json_string = json.dumps(json_data)

        # Create a socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)  # Set a timeout of 10 seconds

        try:
            # Connect to the server
            print(f"Connecting to {server_ip}:{server_port}")
            sock.connect((server_ip, server_port))
            print(f'Connected to {server_ip}:{server_port}')
            
            # Send the JSON string
            sock.sendall(json_string.encode('utf-8'))
            print(f'JSON data sent successfully: {json_string}')
            
            # Receive acknowledgment from the server
            ack = sock.recv(1024).decode('utf-8')
            print(f'Server acknowledgment: {ack}')

        except Exception as e:
            print(f'Failed to send data: {e}')
        finally:
            sock.close()

    except Exception as e:
        print(f"Error sending data: {e}")

# Replace with your Wi-Fi credentials and server details
ssid = 'VictoriPhone'
password = 'asdfghjkl'
server_ip = '172.20.10.3'
server_port = 12345

# Connect to Wi-Fi
connect_to_wifi(ssid, password)

# Loop to send sensor data every 10 seconds
while True:
    # Read sensor data
    sensor_data = read_sensor_data()

    # Send the JSON data to the server if sensor data is available
    if sensor_data:
        send_json_data(server_ip, server_port, sensor_data)

    # Wait for 15 seconds before sending the next update
    time.sleep(15)
