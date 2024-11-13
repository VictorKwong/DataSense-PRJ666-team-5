import { useContext, useEffect, useState } from "react";
import { RealtimeDataContext } from "@/components/layout"; // Access latest data from context
import styles from "../styles/Dashboard.module.css";
import Image from "next/image";
import SimpleItem from "@/components/Item/SimpleItem";
import Link from "next/link";
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import LoadingPage from "@/components/loadingPage";

// Suggested Image Sources
import SetupGuideImage from "@/public/assets/images/setup-guide.webp";
import MonitoringImage from "@/public/assets/images/monitoring.webp";
import ReportsImage from "@/public/assets/images/reports.webp";

export default function Dashboard() {
  const latestData = useContext(RealtimeDataContext); // Access latest data from context
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle expandable content

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingPage />;
  }

  const items = [
    {
      src: SetupGuideImage,
      name: "Setup Guide",
      link: "/setup-guide",
      buttonText: "Setup Guide",
      icon: <i className="fas fa-tools"></i>,
      color: "#17a2b8",
    },
    {
      src: MonitoringImage,
      name: "Monitoring",
      link: "/interactive-data-hub",
      buttonText: "Interactive Data Hub",
      icon: <i className="fas fa-eye"></i>,
      color: "#ffc107",
    },
    {
      src: ReportsImage,
      name: "Reports",
      link: "/reports",
      buttonText: "View Reports",
      icon: <i className="fas fa-chart-line"></i>,
      color: "#007bff",
    },
  ];

  return (
    <>
      <div
        className="container"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
      >
        <h1 className={`m-3 p-3 text-center ${styles.titleText}`}>
          Welcome back, User
        </h1>

        {/* Quick Links and Quick View Section */}
        <div className={styles.favoritesQuickView}>
          <SimpleItem
            className={`${styles.simpleItem} ${styles.favoritesBackground}`}
            key={"Quick Links"}
            title={"Quick Links"}
            icon={<i className="fa-solid fa-link"></i>}
          >
            <ul>
              <li className={styles.favoriteItem}>
                <h3>
                  <Link href="/contact">
                    Contact
                  </Link>
                </h3>
              </li>
              <li className={styles.favoriteItem}>
                <h3>
                  <Link href="/about">
                    About
                  </Link>
                </h3>
              </li>
              <li className={styles.favoriteItem}>
                <h3>
                  <Link href="/info-hub">
                    Info Hub
                  </Link>
                </h3>
              </li>
            </ul>
          </SimpleItem>

          {/* Quick View Section with Real-Time Data */}
          <SimpleItem
            className={`${styles.simpleItem} ${styles.quickViewBackground}`}
            key={"Quick View"}
            title={"Quick View"}
            icon={<i className="fa-sharp fa-solid fa-eye"></i>}
          >
            <ul>
              <li className={styles.quickViewItem}>
                <Link href="/data">
                  View Data
                </Link>
                {latestData ? (
                  <div className={styles.latestData}>
                    <p><strong>Latest Data:</strong></p>
                    <p>Temperature: {latestData.temperature}°C</p>
                    {isExpanded && (
                      <>
                        <p>Humidity: {latestData.humidity}%</p>
                        <p>Moisture: {latestData.moisture}%</p>
                        <p>Timestamp: {new Date(latestData.timestamp).toLocaleString()}</p>
                      </>
                    )}
                    <button
                      className={styles.expandButton}
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  </div>
                ) : (
                  <p>Loading latest data...</p>
                )}
              </li>
              <li className={styles.quickViewItem}>
                <Link href="/devices">
                  Devices
                </Link>
              </li>
              <li className={styles.quickViewItem}>
                <Link href="/interactivedatahub">
                  Interactive Data Hub
                </Link>
              </li>
            </ul>
          </SimpleItem>
        </div>

        {/* Card Section with Updated Items */}
        <div className={styles.cardsContainer}>
          {items.map((item, index) => (
            <div
              className={`${styles.card} card`}
              key={index}
              style={{ backgroundColor: item.color }}
            >
              <Image
                src={item.src}
                className="card-img-top"
                alt={item.name}
                width={300}
                height={200}
              />
              <div className="card-body" style={{ textAlign: "center" }}>
                <a href={item.link} className={`btn ${styles.cardButton}`}>
                  {item.buttonText} {item.icon}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
