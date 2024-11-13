import { useState, useContext, useEffect } from "react";
import { Card, Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import Image from "next/image";
import { FaThermometerHalf, FaTint, FaSeedling } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { RealtimeDataContext } from "@/components/layout";
import Link from "next/link"; // Import Link for navigation

const cropData = [
  {
    name: "Wheat",
    optimalTemperature: "15°C - 25°C",
    optimalHumidity: "40% - 60%",
    optimalSoilMoisture: "20% - 40%",
    image: "/assets/images/wheat.webp",
    sensors: ["Temperature Sensor", "Soil Moisture Sensor"],
    description: "Wheat thrives in cooler temperatures and moderate soil moisture. Ideal for regions with seasonal rain.",
  },
  {
    name: "Corn",
    optimalTemperature: "18°C - 27°C",
    optimalHumidity: "50% - 70%",
    optimalSoilMoisture: "30% - 50%",
    image: "/assets/images/corn.webp",
    sensors: ["Temperature Sensor", "Humidity Sensor", "Soil Moisture Sensor"],
    description: "Corn requires warmer temperatures and consistent soil moisture for optimal growth, making it ideal for summer cultivation.",
  },
  {
    name: "Tomato",
    optimalTemperature: "20°C - 25°C",
    optimalHumidity: "60% - 80%",
    optimalSoilMoisture: "40% - 70%",
    image: "/assets/images/tomato.webp",
    sensors: ["Temperature Sensor", "Soil Moisture Sensor", "Light Sensor"],
    description: "Tomatoes need high humidity and sunlight, making them great for greenhouse and warm-weather farming.",
  },
];

function InfoHub() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLink, setActiveLink] = useState("#crops");  // Track active section
  const latestData = useContext(RealtimeDataContext);

  // Filtered crops based on the search term
  const filteredCrops = cropData.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle scroll and update active link based on the visible section
  useEffect(() => {
    const onScroll = () => {
      const sections = ["#crops", "#sensors", "#tips", "#resources"];
      sections.forEach((section) => {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom >= 0) {
            setActiveLink(section);  // Set active section
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container fluid className="info-hub p-0">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar p-4">
          <h3 className="text-center mb-4">Info Hub Navigation</h3>
          <ListGroup variant="flush">
            <ListGroup.Item
              action
              href="#crops"
              className={`sidebar-link ${activeLink === "#crops" ? "active" : ""}`}
              onClick={() => setActiveLink("#crops")}
              style={{
                backgroundColor: activeLink === "#crops" ? "rgba(0, 123, 255, 0.2)" : "",
              }}
            >
              <Button variant="outline-primary" className="w-100">Crop Information</Button>
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="#sensors"
              className={`sidebar-link ${activeLink === "#sensors" ? "active" : ""}`}
              onClick={() => setActiveLink("#sensors")}
              style={{
                backgroundColor: activeLink === "#sensors" ? "rgba(0, 123, 255, 0.2)" : "",
              }}
            >
              <Button variant="outline-primary" className="w-100">Recommended Sensors</Button>
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="#tips"
              className={`sidebar-link ${activeLink === "#tips" ? "active" : ""}`}
              onClick={() => setActiveLink("#tips")}
              style={{
                backgroundColor: activeLink === "#tips" ? "rgba(0, 123, 255, 0.2)" : "",
              }}
            >
              <Button variant="outline-primary" className="w-100">General Growing Tips</Button>
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="#resources"
              className={`sidebar-link ${activeLink === "#resources" ? "active" : ""}`}
              onClick={() => setActiveLink("#resources")}
              style={{
                backgroundColor: activeLink === "#resources" ? "rgba(0, 123, 255, 0.2)" : "",
              }}
            >
              <Button variant="outline-primary" className="w-100">Resources</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col md={9} className="content p-5">
          <div className="main-header p-4 mb-5 text-center rounded shadow-sm">
            <h1>Info Hub: Optimal Growing Conditions & Sensor Recommendations</h1>
            <p className="lead">
              Discover optimal environmental conditions for various crops and explore recommended sensors to help you monitor and maintain these conditions effectively.
            </p>
          </div>

          {/* Crop Information Section with Search */}
          <h2 id="crops" className="section-header mb-4">Crop Information</h2>
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search for a crop..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
          <Row>
            {filteredCrops.map((crop, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card className="h-100 crop-card shadow-sm rounded hover-effect">
                  <div className="card-img-container">
                    <Image
                      src={crop.image}
                      alt={`${crop.name} image`}
                      width={400}
                      height={250}
                      className="card-img-top rounded-top"
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{crop.name}</Card.Title>
                    <Card.Text>{crop.description}</Card.Text>
                    <ListGroup variant="flush" className="mb-3">
                      <ListGroup.Item>
                        <FaThermometerHalf className="icon me-2" /> 
                        <strong>Optimal Temperature:</strong> {crop.optimalTemperature}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <FaTint className="icon me-2" /> 
                        <strong>Optimal Humidity:</strong> {crop.optimalHumidity}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <FaSeedling className="icon me-2" /> 
                        <strong>Optimal Soil Moisture:</strong> {crop.optimalSoilMoisture}
                      </ListGroup.Item>
                    </ListGroup>

                    {/* Real-Time Sensor Data */}
                    <h6 className="mt-3">Current Sensor Data:</h6>
                    {latestData ? (
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <FaThermometerHalf className="icon me-2" /> 
                          <strong>Temperature:</strong> {latestData.temperature}°C
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <FaTint className="icon me-2" /> 
                          <strong>Humidity:</strong> {latestData.humidity}% 
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <FaSeedling className="icon me-2" /> 
                          <strong>Soil Moisture:</strong> {latestData.moisture}%
                        </ListGroup.Item>
                      </ListGroup>
                    ) : (
                      <p>No real-time data available</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Other sections, like Recommended Sensors, Growing Tips, and Resources */}
          <h2 id="sensors" className="section-header mb-4">Recommended Sensors</h2>
          <ul>
            <li><strong>Temperature Sensor:</strong> Helps maintain the optimal temperature for crop growth.</li>
            <li><strong>Humidity Sensor:</strong> Monitors air moisture to keep humidity within ideal levels.</li>
            <li><strong>Soil Moisture Sensor:</strong> Tracks soil moisture levels, essential for healthy root systems.</li>
            <li><strong>Light Sensor:</strong> Measures light exposure, beneficial for crops like tomatoes.</li>
          </ul>

          {/* General Growing Tips */}
          <h2 id="tips" className="section-header mb-4">General Growing Tips</h2>
          <ul>
            <li>Ensure consistent watering schedules based on soil moisture levels.</li>
            <li>Monitor temperature changes and adjust irrigation or shading as needed.</li>
            <li>Choose sensors that match your crops environmental requirements.</li>
          </ul>

          {/* Resources */}
          <h2 id="resources" className="section-header mb-4">Additional Resources</h2>
          <ul>
            <li><a href="https://www.agriculture.com" target="_blank" rel="noopener noreferrer">Agriculture.com</a></li>
            <li><a href="https://www.cropscience.bayer.com" target="_blank" rel="noopener noreferrer">Bayer Crop Science</a></li>
            <li><a href="https://www.smart-farming.com" target="_blank" rel="noopener noreferrer">Smart Farming</a></li>
          </ul>
        </Col>
      </Row>

      <style jsx>{`
        .info-hub { padding: 0; }
        .sidebar { background-color: #f8f9fa; height: 100%; border-right: 1px solid #ddd; }
        .main-header { background-color: #f5f9ff; border-radius: 8px; }
        .section-header { color: #007bff; font-weight: bold; text-transform: uppercase; }
        .crop-card { overflow: hidden; }
        .card-img-container { width: 100%; overflow: hidden; height: 200px; }
        .crop-card:hover { transform: translateY(-5px); transition: transform 0.3s ease; }
        .icon { color: #007bff; }
        ul { list-style-type: disc; padding-left: 20px; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }


        .sidebar-link.list-group-item.active {
          background-color: #007bff !important;  /* Blue background when active */
          color: white !important;               /* White text when active */
        }

        .sidebar-link:hover {
          color: #007bff !important;             /* Blue text on hover */
        }

        .sidebar-link {
          background-color: transparent;        /* No background by default */
          color: #007bff !important;             /* Blue text by default */
          transition: color 0.3s ease;
        }
      `}</style>
    </Container>
  );
}

export default InfoHub;
