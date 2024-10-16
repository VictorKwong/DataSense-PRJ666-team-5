import { jwtDecode } from "jwt-decode";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"; // Use your API URL or default to localhost

export async function loginUser(email, password) {
  //   call nodejs server to register using email/password, then handle response and store into localStorage.
  const res = await fetch(`${API_URL}/users/login`, {
    //${process.env.NEXT_PUBLIC_API_URL}
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  const { token, message } = await res.json();
  if (res.status === 200) {
    setToken(token);
    const userFromToken = readToken();
    console.log("userFromToken", userFromToken);
    return userFromToken;
  } else {
    throw new Error(message);
  }
}

export async function registerUser(email, password) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const { token, message } = await res.json();
  if (res.status === 201) {
    setToken(token);
    const userFromToken = readToken();
    console.log("userFromToken", userFromToken);
    return userFromToken;
  } else {
    throw new Error(message);
  }
}

function setToken(token) {
  localStorage.setItem("access_token", token);
}

export function getToken() {
  try {
    return localStorage.getItem("access_token");
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}
export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}
