// pages/privacy-policy.js
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
  return (
    <Container fluid className="privacy-policy-page" style={containerStyle}>
      <h1 className="text-center mb-4">Privacy Policy</h1>
      <p style={introTextStyle}>
        Your privacy is critically important to us at DataSense. This Privacy
        Policy outlines what information we collect, how we use it, and how you
        can manage your data. By using our services, you agree to the collection
        and use of information in accordance with this policy.
      </p>

      <h2 style={sectionTitleStyle}>1. Information We Collect</h2>
      <p style={textStyle}>
        We collect information directly from you when you use our services. The
        types of information we may collect include:
      </p>
      <ul style={listStyle}>
        <li>
          <strong>Personal Information:</strong> Information such as your name,
          email address, and contact information when you register.
        </li>
        <li>
          <strong>Usage Data:</strong> Information on how our services are
          accessed and used, including device information and system analytics.
        </li>
        <li>
          <strong>Sensor Data:</strong> Data collected from sensors connected to
          your account, like temperature, humidity, and moisture levels.
        </li>
      </ul>

      <h2 style={sectionTitleStyle}>2. How We Use Your Information</h2>
      <p style={textStyle}>
        DataSense uses the collected data for various purposes, including:
      </p>
      <ul style={listStyle}>
        <li>To provide and maintain our services.</li>
        <li>To notify you about changes to our services.</li>
        <li>
          To analyze usage and optimize the performance of our services.
        </li>
        <li>To provide personalized alerts and recommendations.</li>
      </ul>

      <h2 style={sectionTitleStyle}>3. Data Sharing & Disclosure</h2>
      <p style={textStyle}>
        We respect your privacy and ensure that your personal data is not sold
        or shared without consent. However, we may disclose information under
        certain conditions:
      </p>
      <ul style={listStyle}>
        <li>To comply with legal obligations.</li>
        <li>
          To protect and defend the rights or property of DataSense.
        </li>
        <li>To prevent wrongdoing in connection with our services.</li>
      </ul>

      <h2 style={sectionTitleStyle}>4. Data Security</h2>
      <p style={textStyle}>
        We implement measures to secure your data. However, no method of
        transmission over the internet or electronic storage is completely
        secure. While we strive to use commercially acceptable means to protect
        your personal data, we cannot guarantee its absolute security.
      </p>

      <h2 style={sectionTitleStyle}>5. Your Data Control</h2>
      <p style={textStyle}>
        You have the right to access, update, or delete the information we hold
        about you. If you would like to exercise these rights, please contact
        our support team.
      </p>

      <h2 style={sectionTitleStyle}>6. Changes to this Policy</h2>
      <p style={textStyle}>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. You are
        advised to review this Privacy Policy periodically for any changes.
      </p>

      <p style={closingTextStyle}>
        If you have any questions or concerns about our Privacy Policy, please
        contact us at support@datasense.com.
      </p>
    </Container>
  );
};

// Styling
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "30px",
  backgroundColor: "#fff",
};

const introTextStyle = {
  fontSize: "1.1rem",
  color: "#555",
};

const sectionTitleStyle = {
  color: "#007bff",
  fontWeight: "bold",
  fontSize: "1.4rem",
  marginTop: "30px",
};

const textStyle = {
  fontSize: "1.1rem",
  color: "#333",
};

const listStyle = {
  listStyleType: "disc",
  paddingLeft: "20px",
  fontSize: "1.1rem",
  color: "#555",
};

const closingTextStyle = {
  fontSize: "1.1rem",
  color: "#555",
  marginTop: "40px",
};

export default PrivacyPolicy;
