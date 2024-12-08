import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "react-bootstrap";
import { registerUser, upsertUserWithGoogleIdToken } from "@/lib/authenticate";
import { userAtom } from "../store/store";
import { useAtom } from "jotai";
import Link from "next/link";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

// Password validation function
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // console.log("password: " + password);
  // console.log("testing: " + passwordRegex.test(password));
  return passwordRegex.test(password);
};

const Register = () => {
  const [user, setUser] = useAtom(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegisterWithEmailPassword = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter"
      );
      return;
    }

    // If validation passes, attempt to create the user
    try {
      const userData = await registerUser(email, password);
      setUser(userData);
      router.push("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error(error);
      if (String(error?.message).includes("E11000 duplicate key error")) {
        setError(
          "Email is already used, please sign-in, or use a different email."
        );
      } else {
        setError("Something went wrong, please try again.");
      }
    }
  };

  async function handleGoogleSuccess(response) {
    console.log("### success", response);
    try {
      const userData = await upsertUserWithGoogleIdToken(response.credential);
      setUser(userData);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGoogleError() {
    console.log("### error");
  }

  const handleCancel = () => {
    router.push("/"); // Redirect to homepage
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Join DataSense Today</h1>
        <p className="register-description">
          Manage your devices and get insights seamlessly.
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          onSubmit={handleRegisterWithEmailPassword}
          style={{ display: "flex", gap: "15px", flexDirection: "column" }}
        >
          <input
            className="form-control text-center mt-2 mb-1"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control text-center mt-2 mb-1"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="form-control text-center mt-2 mb-1"
            type="password"
            value={confirmPassword}
            placeholder="Re-enter Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <label>
            <input className="mt-2 mb-2" type="checkbox" required /> I agree to
            the{" "}
            <Link href="/terms" className="terms-link">
              terms and conditions
            </Link>
          </label>

          <div className="register-button-container">
            <Button type="submit" className="register-button">
              Register
            </Button>
            <Button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
        <hr />

        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          ></GoogleLogin>
        </GoogleOAuthProvider>
      </div>

      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-image: url("/assets/images/background_image.webp"); /* Background image */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        .register-card {
          background-color: rgba(
            255,
            255,
            255,
            0.9
          ); /* Slight transparency to blend with the background */
          padding: 60px;
          max-width: 450px;
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          text-align: center;
          z-index: 2;
        }
        .register-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        .register-description {
          font-size: 1rem;
          margin-bottom: 20px;
          color: #555;
        }
        .form-control {
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
        }
        .register-button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .register-button,
        .cancel-button {
          padding: 12px 25px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s ease;
        }
        .register-button {
          background-color: #007bff;
          color: #fff;
        }
        .register-button:hover {
          background-color: #0056b3;
        }
        .cancel-button {
          background-color: #6c757d;
          color: #fff;
        }
        .cancel-button:hover {
          background-color: #5a6268;
        }
        .google-register-button {
          background-color: #db4437;
          color: #fff;
          padding: 12px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          border: none;
          transition: background 0.3s ease;
          margin-top: 30px;
          width: 100%;
        }
        .google-register-button:hover {
          background-color: #c53727;
        }
        .terms-link {
          color: #007bff;
          text-decoration: none;
        }
        .terms-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;
