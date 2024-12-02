// Layout.js
import Footer from "./footer";
import Navbar from "./navbar";
import { createContext, useEffect, useState } from "react";
import { getSensorHistoryData } from "@/pages/api/sensor";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "@/store/store";
import { readToken } from "@/lib/authenticate";

// Contexts for Realtime Data, Theme, and Notifications
export const RealtimeDataContext = createContext(null);
export const ThemeContext = createContext(null);
export const NotificationsContext = createContext([]);

const Layout = ({ children }) => {
  const [latestData, setLatestData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  // Load token and check authentication status
  useEffect(() => {
    const userFromToken = readToken();
    if (userFromToken) {
      setUser(userFromToken);
    } else if (!["/",
      "/login",
      "/register",
      "/about",
      "/contact",
      "/privacy",
      "/terms"].includes(router.pathname)) {
      router.replace("/login");
    }
  }, [router]);

  // Fetch the latest data and check thresholds
  const fetchLatestData = async () => {
    try {
      const userFromToken = readToken();
      const data = await getSensorHistoryData(userFromToken.email);
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[0];
        setLatestData(latest);
        checkThresholds(latest); // Check thresholds with the latest data
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  // Function to check thresholds and add notifications
  const checkThresholds = (data) => {
    // Retrieve thresholds and conditions from localStorage
    const tempThreshold = localStorage.getItem("temperatureThreshold");
    const tempCondition = localStorage.getItem("temperatureCondition") || "exceeds";
    
    const humidityThreshold = localStorage.getItem("humidityThreshold");
    const humidityCondition = localStorage.getItem("humidityCondition") || "below";
    
    const moistureThreshold = localStorage.getItem("moistureThreshold");
    const moistureCondition = localStorage.getItem("moistureCondition") || "below";

    const newNotifications = [];
    // Temperature Alert
    if (tempThreshold && (
        (tempCondition === "exceeds" && data.temperature > tempThreshold) ||
        (tempCondition === "below" && data.temperature < tempThreshold)
    )) {
        newNotifications.push({
            message: `Temperature ${tempCondition} ${tempThreshold}°C`,
            type: "temperature",
            condition: tempCondition,
            timestamp: new Date().toLocaleString(),
        });
    }

    // Humidity Alert
    if (humidityThreshold && (
        (humidityCondition === "exceeds" && data.humidity > humidityThreshold) ||
        (humidityCondition === "below" && data.humidity < humidityThreshold)
    )) {
        newNotifications.push({
            message: `Humidity ${humidityCondition} ${humidityThreshold}%`,
            type: "humidity",
            condition: humidityCondition,
            timestamp: new Date().toLocaleString(),
        });
    }

    // Moisture Alert
    if (moistureThreshold && (
        (moistureCondition === "exceeds" && data.moisture > moistureThreshold) ||
        (moistureCondition === "below" && data.moisture < moistureThreshold)
    )) {
        newNotifications.push({
            message: `Moisture ${moistureCondition} ${moistureThreshold}%`,
            type: "moisture",
            condition: moistureCondition,
            timestamp: new Date().toLocaleString(),
        });
    }

    // Update notifications context and localStorage
    if (newNotifications.length > 0) {
        setNotifications((prev) => [...prev, ...newNotifications]);
        localStorage.setItem("notificationHistory", JSON.stringify([...notifications, ...newNotifications]));
    }
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notificationHistory");
  };

  // Auto-fetch latest data every 5 seconds
  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={"light"}>
      <NotificationsContext.Provider value={{ notifications, clearNotifications }}>
        <RealtimeDataContext.Provider value={latestData}>
          <div className="layout">
            <Navbar notifications={notifications} clearNotifications={clearNotifications} />
            <main>{children}</main>
            <Footer />
          </div>
        </RealtimeDataContext.Provider>
      </NotificationsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;
