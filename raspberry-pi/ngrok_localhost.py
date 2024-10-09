import socket
import json
import time
import requests

# Define the ngrok URL
SERVER_URL = "https://758f-142-204-17-56.ngrok-free.app/sensor-data"

def start_server(host='0.0.0.0', port=12345):
    # Create a TCP socket
    server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_sock.bind((host, port))
    server_sock.listen(1)
    print(f'Server listening on {host}:{port}')

    try:
        while True:
            print("Waiting for a connection...")

            # Accept the connection from the client (Raspberry Pi)
            client_sock, client_address = server_sock.accept()
            print(f'Connection from {client_address}')

            try:
                while True:
                    # Receive the data in chunks
                    data = b""
                    while True:
                        chunk = client_sock.recv(1024)
                        if not chunk:
                            break
                        data += chunk

                    # Decode and parse the JSON data
                    if data:
                        json_data = json.loads(data.decode('utf-8'))
                        print(f'Received JSON data: {json_data}')

                        # Redirect the received data to the ngrok URL
                        try:
                            response = requests.post(SERVER_URL, json=json_data)
                            if response.status_code == 200:
                                print("Data successfully sent to ngrok endpoint.")
                            else:
                                print(f"Failed to send data. Status code: {response.status_code}")
                        except Exception as e:
                            print(f"Error sending data to ngrok: {e}")

                        # Send acknowledgment to the client
                        client_sock.sendall(b"Data received successfully.")

                    # Sleep to wait for the next data from the client (Raspberry Pi)
                    time.sleep(15)

            except Exception as e:
                print(f'Error handling the data transfer: {e}')
            finally:
                # Close the client socket after processing the data
                client_sock.close()

    except KeyboardInterrupt:
        print("\nServer is shutting down...")
    finally:
        # Close the server socket
        server_sock.close()
        print("Server has been stopped.")

# Start the server
if __name__ == '__main__':
    start_server(host='0.0.0.0', port=12345)
