// pages/about.js
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <Container className="mt-5 about-page">
      {/* Introduction Section */}
      <section className="intro-section text-center mb-5">
        <h1>About DataSense</h1>
        <p className="lead">
          DataSense is an advanced environmental monitoring platform that leverages real-time data to empower users in making informed decisions. Designed for users from various backgrounds, DataSense is your partner in efficient and proactive environmental management.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section mb-5">
        <Row>
          <Col md={12}>
            <h2>Our Mission</h2>
            <p>
              At DataSense, our mission is to create a seamless interface for accessing, analyzing, and utilizing environmental data. We aim to simplify the monitoring of crucial parameters such as temperature, humidity, and moisture, so you can act faster, improve outcomes, and ensure optimal conditions.
            </p>
          </Col>
        </Row>
      </section>

      {/* Features Section */}
      <section className="features-section mb-5">
        <h2>Key Features</h2>
        <Row className="mt-3">
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Real-Time Monitoring</Card.Title>
                <Card.Text>
                  Instantly access up-to-date data on temperature, humidity, and moisture levels. Our real-time monitoring ensures that you always have the latest information at your fingertips.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Custom Alerts & Notifications</Card.Title>
                <Card.Text>
                  Set your thresholds and receive immediate notifications when values exceed or drop below desired levels. Stay informed and respond quickly to environmental changes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card">
              <Card.Body>
                <Card.Title>Interactive Data Visualization</Card.Title>
                <Card.Text>
                  Leverage our Interactive Data Hub for graphs, charts, and analysis tools that allow you to spot trends, patterns, and insights with ease.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Core Values Section */}
      <section className="values-section mb-5">
        <h2>Core Values</h2>
        <Row>
          <Col md={6}>
            <Card className="value-card">
              <Card.Body>
                <Card.Title>Innovation</Card.Title>
                <Card.Text>
                  We embrace cutting-edge technology to deliver a robust platform that meets the evolving needs of our users.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="value-card">
              <Card.Body>
                <Card.Title>Accessibility</Card.Title>
                <Card.Text>
                  Our goal is to provide a user-friendly interface, ensuring that data and insights are accessible to everyone, regardless of technical expertise.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mt-3">
            <Card className="value-card">
              <Card.Body>
                <Card.Title>Reliability</Card.Title>
                <Card.Text>
                  Count on DataSense for accurate and consistent data collection, so you can make decisions with confidence.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mt-3">
            <Card className="value-card">
              <Card.Body>
                <Card.Title>Sustainability</Card.Title>
                <Card.Text>
                  We are committed to helping users maintain sustainable environments through proactive data-driven insights.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Vision Section */}
      <section className="vision-section mb-5">
        <h2>Our Vision</h2>
        <p>
          Looking to the future, DataSense aims to become a global leader in environmental monitoring solutions. Our vision includes expanding our data capabilities, enhancing AI-driven insights, and enabling integration with a wider range of sensors and devices, so users can rely on DataSense as their complete environmental monitoring solution.
        </p>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .about-page {
          background-color: #f4f8fb;
          padding: 40px;
          border-radius: 8px;
        }
        h1, h2 {
          color: #333;
          font-weight: bold;
        }
        .lead {
          color: #555;
        }
        .mission-section, .vision-section {
          background-color: #e9f7fa;
          padding: 20px;
          border-radius: 8px;
        }
        .features-section h2, .values-section h2 {
          color: #007bff;
        }
        .feature-card, .value-card {
          border: none;
          background-color: #fff;
          border-left: 5px solid #007bff;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        .feature-card:hover, .value-card:hover {
          transform: translateY(-5px);
        }
        .card-title {
          font-size: 1.25rem;
          color: #007bff;
          font-weight: bold;
        }
        .card-text {
          color: #666;
        }
        .intro-section {
          color: #333;
          background: linear-gradient(to right, #007bff, #00b4d8);
          padding: 40px;
          border-radius: 8px;
          color: white;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .intro-section h1 {
          font-size: 2.5rem;
        }
        .intro-section p {
          font-size: 1.1rem;
          color: #f1f1f1;
        }
      `}</style>
    </Container>
  );
}
