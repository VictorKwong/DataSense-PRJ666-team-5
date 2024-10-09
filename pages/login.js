import { useSession, signIn } from "next-auth/react";
import { Form, Alert, Button } from "react-bootstrap";
import { loginUser } from "@/lib/authenticate";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { favouritesAtom, searchHistoryAtom, userAtom } from "../store/store";
import { useAtom } from "jotai";
import Image from "next/image"; // Corrected import for Image component

export default function Login(props) {
  const { data, status } = useSession(); // google login, or other oauth.

  const [user, setUser] = useAtom(userAtom);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLoginWithEmailPassword(e) {
    e.preventDefault();
    try {
      const userData = await loginUser(email, password); // call backend, get token, store token
      setUser(userData);
      router.push("/dashboard");
    } catch (err) {
      setWarning(err.message);
    }
  }

  // const handleGoogleLogIn = async () => {
  //   try {
  //     // await signInWithPopup(auth, provider);
  //     const res = await signIn("google");
  //     console.log("###", res);
  //     // router.push("/dashboard"); // Redirect to dashboard after successful login
  //   } catch (error) {
  //     setWarning(error.message); // Corrected the error handling function name
  //   }
  // };
  useEffect(() => {
    if (status === "authenticated" && data) {
      // google login
      console.log({ data });
      router.push("/dashboard");
    }
  }, [data, status, router]);

  return (
    <>
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Welcome back!</h1>
        <br />
        <Form onSubmit={handleLoginWithEmailPassword}>
          <Form.Group>
            <Form.Control
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </Form.Group>

          {warning && (
            <>
              <br />
              <Alert variant="danger">{warning}</Alert>
            </>
          )}
          <br />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="text" className="pull-right p-1" type="submit">
              Login
            </Button>
            <Button
              variant="text"
              className="pull-right p-1"
              type="submit"
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
          variant="text"
          className="pull-right p-1"
          type="submit"
        >
          <Image
            src="/assets/images/search.png"
            alt="Google-logo"
            width={20}
            height={20}
          />

          <span className="m-2">Login with Google</span>
        </Button>
      </div>
    </>
  );
}
