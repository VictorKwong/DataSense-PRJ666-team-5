// pages/AlertsAndNotifications.js
import { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Badge,
  Form,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { FaExclamationTriangle, FaCheckCircle, FaBell, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const initialNotifications = [
  { id: 1, type: "Temperature Alert", message: "Temperature exceeded 30°C!", isRead: false },
  { id: 2, type: "Humidity Alert", message: "Humidity dropped below 30%", isRead: false },
];

export default function AlertsAndNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [email, setEmail] = useState("");
  const [thresholds, setThresholds] = useState({
    temperature: 30,
    humidity: 40,
    moisture: 50,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const clearAllAlerts = () => {
    setEmail("");
    setThresholds({ temperature: 30, humidity: 40, moisture: 50 });
    setSuccessMessage("All alert settings have been cleared.");
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSuccessMessage("Settings saved successfully!");
  };

  return (
    <Container className="alerts-container" style={{ maxWidth: "800px", marginTop: "50px" }}>
      {/* Alert Settings */}
      <Card className="mb-5 shadow-sm border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4>Alert Settings</h4>
          <Button variant="outline-light" onClick={clearAllAlerts}>
            <FaTrash /> Clear All Alerts
          </Button>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSaveSettings}>
            <Row className="mb-3">
              <Col md={12}>
                <Form.Label>Email for Alerts</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email for alerts"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-3">
                <Form.Label>Temperature Threshold (°C)</Form.Label>
                <Form.Control
                  type="number"
                  value={thresholds.temperature}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, temperature: parseInt(e.target.value) })
                  }
                />
                <ProgressBar
                  now={(thresholds.temperature / 50) * 100}
                  variant="danger"
                  label={`${thresholds.temperature}°C`}
                  className="mt-2"
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Humidity Threshold (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={thresholds.humidity}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, humidity: parseInt(e.target.value) })
                  }
                />
                <ProgressBar
                  now={(thresholds.humidity / 100) * 100}
                  variant="info"
                  label={`${thresholds.humidity}%`}
                  className="mt-2"
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>Moisture Threshold (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={thresholds.moisture}
                  onChange={(e) =>
                    setThresholds({ ...thresholds, moisture: parseInt(e.target.value) })
                  }
                />
                <ProgressBar
                  now={(thresholds.moisture / 100) * 100}
                  variant="success"
                  label={`${thresholds.moisture}%`}
                  className="mt-2"
                />
              </Col>
            </Row>
            <Button type="submit" variant="primary" className="w-100 mt-4">
              Save Alert Settings
            </Button>
          </Form>
          {successMessage && (
            <p className="text-success mt-3">{successMessage}</p>
          )}
        </Card.Body>
      </Card>

      {/* Notification Center */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4>Notification Center</h4>
          <Button variant="outline-light" onClick={clearNotifications}>
            <FaTrash /> Clear All Notifications
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListGroup.Item
                key={notification.id}
                className={`d-flex align-items-center justify-content-between ${
                  notification.isRead ? "bg-light" : ""
                }`}
              >
                <div className="d-flex align-items-center">
                  <Badge
                    bg={notification.isRead ? "secondary" : "danger"}
                    pill
                    className="me-3"
                  >
                    {notification.isRead ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  </Badge>
                  <div>
                    <strong>{notification.type}</strong>
                    <p className="mb-0">{notification.message}</p>
                  </div>
                </div>
                {!notification.isRead && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center text-muted">
              No notifications at the moment.
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <style jsx>{`
        .alerts-container h4 {
          font-weight: bold;
        }
        .alerts-container .card-header {
          font-size: 1.2rem;
        }
        .alerts-container .btn {
          font-size: 0.9rem;
        }
        .alerts-container .progress-bar {
          transition: width 0.4s ease;
        }
      `}</style>
    </Container>
  );
}
