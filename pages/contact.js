// pages/contact.js
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  return (
    <Container fluid className="contact-page" style={containerStyle}>
      <h1 className="text-center mb-4" style={headerStyle}>Get in Touch</h1>
      <p className="text-center mb-5" style={introTextStyle}>
        We&apos;d love to hear from you! Whether you have a question, feedback, or just want to connect,
        our team is here to help. Reach out using any of the options below, and we&apos;ll get back to
        you as soon as possible.
      </p>

      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card style={cardStyle}>
            <Card.Body className="text-center">
              <FaPhoneAlt size={40} style={iconStyle} />
              <h4 className="mt-3">Phone</h4>
              <p>+1 (800) 123-4567 <br /> +1 (800) 987-6543</p>
              <small className="text-muted">Available Mon-Fri, 9 AM - 6 PM</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card style={cardStyle}>
            <Card.Body className="text-center">
              <FaEnvelope size={40} style={iconStyle} />
              <h4 className="mt-3">Email</h4>
              <p>hello@datasense.com</p>
              <small className="text-muted">We respond within 24 hours</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card style={cardStyle}>
            <Card.Body className="text-center">
              <FaMapMarkerAlt size={40} style={iconStyle} />
              <h4 className="mt-3">Office</h4>
              <p>456 DataSense Blvd, Suite 300<br />Tech City, CA 90210</p>
              <small className="text-muted">Open Mon-Fri, 9 AM - 5 PM</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Styles
const containerStyle = {
  backgroundColor: "#f8f9fa",
  padding: "50px 0",
};

const headerStyle = {
  color: "#111827", // Dark color from the footer
  fontSize: "2.5rem",
  fontWeight: "bold",
};

const introTextStyle = {
  color: "#6c757d", // Subtle gray for the intro text
  fontSize: "1.2rem",
  maxWidth: "700px",
  margin: "0 auto",
};

const cardStyle = {
  border: "none",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  padding: "20px",
};

const iconStyle = {
  color: "#007bff", // Blue from the logo/footer
};

export default Contact;
