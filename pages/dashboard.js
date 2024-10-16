import { RealtimeDataContext } from "@/components/layout";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css"; // Import custom CSS module
import Image from "next/image";
import ExpandableItem from "@/components/Item/ExpandableItem";
import SimpleItem from "@/components/Item/SimpleItem";
import Link from "next/link";
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import LoadingPage from "@/components/loadingPage";

// Suggested Image Sources
import DeviceSetupImage from "@/public/assets/images/device-setup.webp"; // Replace with your image
import DevicesImage from "@/public/assets/images/devices.webp"; // Replace with your image
import DataImage from "@/public/assets/images/data-graph.webp"; // Replace with your image

export default function Dashboard() {
  const realtimeData = useContext(RealtimeDataContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated(); // Check authentication
      if (!authenticated) {
        router.push('/');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // If loading, return a loading indicator (or null)
  if (loading) {
    return <LoadingPage />;
  }

  const items = [
    {
      src: DeviceSetupImage,
      name: "Add Device",
      link: "#",
      buttonText: "Add Device",
      icon: <i className="far fa-plus-square"></i>,
      color: "#dc3545", // Red color for the card
    },
    {
      src: DevicesImage,
      name: "Your Devices",
      link: "/devices",
      buttonText: "Manage Devices",
      icon: <i className="fas fa-laptop me-2"></i>,
      color: "#28a745", // Green color for the card
    },
    {
      src: DataImage,
      name: "Your Data",
      link: "/data",
      buttonText: "View Data",
      icon: <i className="fas fa-database me-2"></i>,
      color: "#007bff", // Blue color for the card
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

        {/* Favorites and Quick View Section */}
        <div className={styles.dataBody}>
          <div className={styles.favoritesQuickView}>
            {/* Favorites Section */}
            <SimpleItem
              className={`${styles.simpleItem} ${styles.favoritesBackground}`}
              key={"Favourites"}
              title={"Favourites"}
              icon={<i className="fa-solid fa-star"></i>}
            >
              <ul>
                <li className={styles.favoriteItem}>
                  <h3>
                    <Link href="/devices/Warehouse">
                      Warehouse
                      <i className="fa-solid fa-square-up-right"></i>
                    </Link>
                  </h3>
                </li>
              </ul>
            </SimpleItem>

            {/* Quick View Section */}
            <SimpleItem
              className={`${styles.simpleItem} ${styles.quickViewBackground}`}
              key={"Quick View"}
              title={"Quick View"}
              icon={<i className="fa-sharp fa-solid fa-eye"></i>}
            >
              <ul>
                <li className={styles.quickViewItem}>
                  <Link href="/devices/Warehouse">
                    Warehouse
                    <i className="fas fa-plus"></i>
                  </Link>
                </li>
                <li className={styles.quickViewItem}>
                  <Link href="/devices/Home">
                    Home
                    <i className="fas fa-plus"></i>
                  </Link>
                </li>
                <li className={styles.quickViewItem}>
                  <Link href="/devices/Greenhouse">
                    Greenhouse
                    <i className="fas fa-plus"></i>
                  </Link>
                </li>
              </ul>
            </SimpleItem>
          </div>
        </div>

        {/* Card Section for Devices and Data */}
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
