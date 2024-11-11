// Layout.js
import Footer from "./footer";
import Sidebar from "./sidebar";
import Header from "./header";
import { createContext, useEffect, useState } from "react";
import { getSensorHistoryData } from "@/pages/api/sensor";
import config from "@/pages/api/config.json";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "@/store/store";
import { readToken } from "@/lib/authenticate";
import Navbar from "./navbar";

// Create Contexts for Realtime Data and Theme
export const RealtimeDataContext = createContext(null);
export const ThemeContext = createContext(null);

const Layout = ({ children }) => {
  const [latestData, setLatestData] = useState(null); // New state for latest data
  const [theme, setTheme] = useState("light");
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    let userFromToken = readToken();
    if (userFromToken) {
      setUser(userFromToken);
    }

    if (!userFromToken) {
      if (!["/login", "/register", "/","/about","/contact","/privacy"].includes(window.location.pathname)) {
        router.replace("/login");
      }
    }
  }, [router]);

  // Fetch latest data function (from InteractiveDataHub)
  const fetchLatestData = async () => {
    try {
      const data = await getSensorHistoryData();
      if (Array.isArray(data) && data.length > 0) {
        const latest = data[data.length - 1];
        setLatestData({
          temperature: latest.temperature,
          humidity: latest.humidity,
          moisture: latest.moisture,
          timestamp: latest.timestamp,
        });
      }
    } catch (error) {
      console.error("Error fetching latest sensor data:", error);
    }
  };

  // Auto-fetch latest data every 5 seconds
  useEffect(() => {
    fetchLatestData(); // Fetch on mount
    const interval = setInterval(fetchLatestData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <RealtimeDataContext.Provider value={latestData}>
        <div className="layout">
          <Navbar />
          <div className="content-area d-flex">
            <main
              className={`${
                user ? "main-content-with-sidebar" : "main-content-without-sidebar"
              } flex-grow-1 `}
            >
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </RealtimeDataContext.Provider>
    </ThemeContext.Provider>
  );
};

export default Layout;
