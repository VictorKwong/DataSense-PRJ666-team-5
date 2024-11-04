import { useSession, signIn } from "next-auth/react";
import { Form, Alert, Button } from "react-bootstrap";
import { loginUser } from "@/lib/authenticate";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import Image from "next/image";

export default function Login() {
  const { data, status } = useSession();
  const [user, setUser] = useAtom(userAtom);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLoginWithEmailPassword(e) {
    e.preventDefault();
    setWarning(""); // Reset warning message
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      router.push("/dashboard");
    } catch (err) {
      setWarning(err.message || 'An error occurred during login');
    }
  }

  useEffect(() => {
    if (status === "authenticated" && data) {
      router.push("/dashboard");
    }
  }, [data, status, router]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-description">Sign in to manage your devices with DataSense.</p>
        <Form onSubmit={handleLoginWithEmailPassword}>
          <Form.Group>
            <Form.Control
              placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Control
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </Form.Group>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
          <br />
          <div className="login-button-container">
            <Button className="login-button" type="submit">
              Login
            </Button>
            <Button
              className="cancel-button"
              type="button"
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
        <hr />
        <Button
          onClick={() => signIn("google")}
          className="google-login-button"
          type="button"
        >
          <Image
            src="/assets/images/search.png"
            alt="Google-logo"
            width={20}
            height={20}
          />
          <span className="m-2">Login with Google</span>
        </Button>

        <div className="additional-options">
          <p>
            <a href="/forgot-password" className="link">
              Forgot Password?
            </a>
            <span className="divider">|</span>
            <a href="/signup" className="link">
              Create an Account
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-image: url('/assets/images/background_image.webp'); /* Background image */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }
        .login-card {
          background-color: rgba(255, 255, 255, 0.9); /* Slight transparency */
          padding: 60px;
          max-width: 450px;
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          text-align: center;
          z-index: 2;
        }
        .login-title {
          font-size: 2rem;
          font-weight: bold;
          color: #333;
        }
        .login-description {
          font-size: 1rem;
          margin-bottom: 20px;
          color: #555;
        }
        .login-input {
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 1rem;
        }
        .login-button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .login-button,
        .cancel-button {
          padding: 12px 25px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          transition: background 0.3s ease;
        }
        .login-button {
          background-color: #007bff;
          color: #fff;
        }
        .login-button:hover {
          background-color: #0056b3;
        }
        .cancel-button {
          background-color: #6c757d;
          color: #fff;
        }
        .cancel-button:hover {
          background-color: #5a6268;
        }
        .google-login-button {
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
        .google-login-button:hover {
          background-color: #c53727;
        }
        .additional-options {
          margin-top: 20px;
        }
        .additional-options p {
          font-size: 0.9rem;
          color: #333;
        }
        .link {
          color: #007bff;
          text-decoration: none;
        }
        .link:hover {
          text-decoration: underline;
        }
        .divider {
          margin: 0 10px;
          color: #333;
        }
      `}</style>
    </div>
  );
}
