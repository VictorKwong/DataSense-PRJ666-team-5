import Footer from "./footer";
import Sidebar from "./sidebar";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "@/store/store";
import { readToken } from "@/lib/authenticate";
import Navbar from "./navbar";

// Create Contexts for Realtime Data and Theme
export const RealtimeDataContext = createContext(null);
export const ThemeContext = createContext(null);

const Layout = ({ children }) => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [theme, setTheme] = useState("light");
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    let userFromToken = readToken();
    if (userFromToken) {
      setUser(userFromToken);
    }

    if (!userFromToken) {
      if (
        !["/login", "/register", "/", "/about", "/contact"].includes(
          window.location.pathname
        )
      ) {
        router.replace("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("Received realtime data", newData);
      setRealtimeData(newData);
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <RealtimeDataContext.Provider value={realtimeData}>
        <div className="layout">
          <Navbar />
          <div className="content-area d-flex">
            {/* Added d-flex for layout */}
            {/* {user && <Sidebar />} */}
            <main
              className={`${
                user
                  ? "main-content-with-sidebar"
                  : "main-content-without-sidebar"
              } flex-grow-1 `}
            >
              {/* Main content takes available space */}
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
