import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to DataSense</h1>
        <p>Monitor and manage your devices with real-time data and smart alerts.</p>
        <Link href="/register">
          <Button className="cta-btn">Get Started</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose DataSense?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Real-time Monitoring</h3>
            <p>Get live updates from your connected devices.</p>
          </div>
          <div className="feature-card">
            <h3>Custom Alerts</h3>
            <p>Receive personalized alerts based on your preferences.</p>
          </div>
          <div className="feature-card">
            <h3>Data Analytics</h3>
            <p>Analyze your data with powerful built-in tools.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
        }
        .hero {
          text-align: center;
          padding: 100px 20px;
          background-image: url('/assets/images/background_image.webp');
          background-size: cover;
          color: #fff;
        }
        .cta-btn {
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          text-transform: uppercase;
        }
        .features {
          padding: 50px 20px;
          text-align: center;
          background-color: #f1f5f9;
        }
        .feature-cards {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
        }
        .feature-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 30%;
        }
      `}</style>
    </div>
  );
}
