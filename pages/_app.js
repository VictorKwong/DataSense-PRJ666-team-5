import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { useEffect } from "react"; // Import useEffect to load JS
import ChatBotWrapper from "@/components/ChatBotWrapper"; // Import the ChatBotWrapper

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Dynamically import Bootstrap JS to enable interactive components
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []); // Only run once on mount

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        {/* Add ChatBotWrapper for global chatbot functionality */}
        <ChatBotWrapper />
      </Layout>
    </SessionProvider>
  );
}
