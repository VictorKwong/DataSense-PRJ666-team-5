import { useContext, useEffect, useState } from "react";
import { RealtimeDataContext } from "@/components/layout";
import { Card, Container, Row, Col, Badge, Spinner } from "react-bootstrap";
import { FaThermometerHalf, FaTint, FaSeedling } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Devices() {
  const realtimeData = useContext(RealtimeDataContext); // Get real-time data from context
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    moisture: null,
    isConnected: false,
  });

  useEffect(() => {
    if (realtimeData) {
      setSensorData((prevData) => ({
        ...prevData,
        timestamp: realtimeData.timestamp || prevData.timestamp,
        temperature: realtimeData.temperature || prevData.temperature,
        humidity: realtimeData.humidity || prevData.humidity,
        moisture: realtimeData.moisture || prevData.moisture,
        isConnected: realtimeData.isConnected || prevData.isConnected,
      }));
    }
  }, [realtimeData]);

  const getStatusBadge = (data) => {
    return data ? (
      <Badge bg="success">Connected</Badge>
    ) : (
      <Badge bg="danger">Disconnected</Badge>
    );
  };

  const formatData = (data) => {
    return data ?? "No Data";
  };

  return (
    <Container fluid className="devices-page p-5">
      <ToastContainer />
      <h1 className="text-center mb-5">Connected Devices</h1>
      <Row>
        {/* Temperature Sensor Card */}
        <Col md={4} className="mb-4">
          <Card className="sensor-card h-100 shadow-sm">
            <Card.Body>
              <div className="sensor-icon temperature">
                <FaThermometerHalf />
              </div>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Temperature Sensor {getStatusBadge(sensorData.isConnected)}
              </Card.Title>
              <Card.Text className="sensor-data">
                <strong>Data:</strong> {formatData(sensorData.temperature)} °C
              </Card.Text>
              <Card.Text>
                <strong>Last Updated:</strong>{" "}
                {sensorData.isConnected ? new Date().toLocaleString() : new Date(sensorData.timestamp).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Humidity Sensor Card */}   
        <Col md={4} className="mb-4">
          <Card className="sensor-card h-100 shadow-sm">
            <Card.Body>
              <div className="sensor-icon humidity">
                <FaTint />
              </div>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Humidity Sensor {getStatusBadge(sensorData.isConnected)}
              </Card.Title>
              <Card.Text className="sensor-data">
                <strong>Data:</strong> {formatData(sensorData.humidity)} %
              </Card.Text>
              <Card.Text>
                <strong>Last Updated:</strong>{" "}
                {sensorData.isConnected ? new Date().toLocaleString() : new Date(sensorData.timestamp).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Soil Moisture Sensor Card */}
        <Col md={4} className="mb-4">
          <Card className="sensor-card h-100 shadow-sm">
            <Card.Body>
              <div className="sensor-icon moisture">
                <FaSeedling />
              </div>
              <Card.Title className="d-flex justify-content-between align-items-center">
                Soil Moisture Sensor {getStatusBadge(sensorData.isConnected)}
              </Card.Title>
              <Card.Text className="sensor-data">
                <strong>Data:</strong> {formatData(sensorData.moisture)} %
              </Card.Text>
              <Card.Text>
                <strong>Last Updated:</strong>{" "}
                {sensorData.isConnected ? new Date().toLocaleString() : new Date(sensorData.timestamp).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <style jsx>{`
        .devices-page {
          background-color: #f4f8fb;
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .sensor-card {
          border-radius: 12px;
          transition: transform 0.3s ease;
          background: #ffffff;
          border: none;
        }
        .sensor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .sensor-icon {
          font-size: 2.5rem;
          padding: 10px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 15px;
        }
        .temperature {
          background: linear-gradient(135deg, #ff8a65, #ff5252);
        }
        .humidity {
          background: linear-gradient(135deg, #42a5f5, #1e88e5);
        }
        .moisture {
          background: linear-gradient(135deg, #66bb6a, #43a047);
        }
        .sensor-data {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }
        .text-center {
          color: #333;
          font-weight: bold;
        }
      `}</style>
    </Container>
  );
}
