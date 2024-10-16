import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import { removeToken } from "@/lib/authenticate"; // Import removeToken function

export default function Logout() {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom); // Get user state atom

  useEffect(() => {
    const logoutUser = async () => {
      // Remove the token from local storage
      removeToken();

      // Trigger signOut with NextAuth, then redirect to home
      await signOut({ redirect: false });
      router.push("/");
    };

    logoutUser();
  }, [router, setUser]);

  return (
    <div className="logout-container">
      <p>Logging you out...</p>
      {/* Optionally, add a spinner or loading animation here */}

      <style jsx>{`
        .logout-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  );
}
