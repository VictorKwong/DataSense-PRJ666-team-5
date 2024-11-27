// pages/Settings.js
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaUser, FaPhoneAlt, FaLock } from "react-icons/fa";
import { loginUser, getToken, setToken } from "@/lib/authenticate";

function Settings() {
  const [user, setUser] = useAtom(userAtom);
  const [username, setUsername] = useState(user?.username);
  const [contact, setContact] = useState(user?.contact);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    setUsername(user?.username);
    setContact(user?.contact);
  }, [user]);

  if (!user) {
    return (
      <div className="container text-center" style={{ marginTop: "50px" }}>
        <h1>You are not logged in</h1>
        <p>Please log in to access your settings</p>
      </div>
    );
  }

  const isValidPassword = (newPassword) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    console.log("password: " + newPassword);
    console.log("testing: " + passwordRegex.test(newPassword));
    return passwordRegex.test(newPassword);
  };

  async function handleSaveUserInfo(e) {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user?._id}/updateInfo`,
      {
        method: "PUT",
        body: JSON.stringify({
          username,
          contact,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`, // Use token for authentication
        },
      }
    );

    if (res.status === 200) {
      const { token, user } = await res.json();
      setToken(token);
      setUser(user);
      setSuccessMessage("User Infomations updated successfully!");
      return user;
    } else {
      const { message } = await res.json();
      throw new Error(message);
    }
  }

  const handleSavePasswords = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMessage("");
    setSuccessMessage("");

    if (!password) {
      setErrorMessage("Please enter your old password.");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter."
      );
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${user?._id}/set-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          newPassword,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then((data) => {
        console.log("Password updated successfully:", data);
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccessMessage("Password updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        setErrorMessage("Failed to update password. Please try again.");
      });
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <h1 className="text-center mb-4" style={{ color: "#007bff" }}>
        Account Settings
      </h1>

      {/* Profile Info */}
      <div className="profile-info mb-4">
        <h2>Profile Information</h2>
        <p>
          Manage your profile details below. This information is used to
          personalize your experience.
        </p>
      </div>

      <form onSubmit={handleSaveUserInfo} className="settings-form mb-5">
        {/* Email */}
        <div className="form-group row mb-4">
          <label className="col-sm-3 col-form-label d-flex align-items-center">
            <FaEnvelope className="me-2 text-muted" /> Email
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              value={user?.email}
              disabled
            />
            <small className="form-text text-muted">
              Email is not editable.
            </small>
          </div>
        </div>

        {/* Username */}
        <div className="form-group row mb-4">
          <label className="col-sm-3 col-form-label d-flex align-items-center">
            <FaUser className="me-2 text-muted" /> Username
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <small className="form-text text-muted">Add user name.</small>
          </div>
        </div>

        {/* Contact Number */}
        <div className="form-group row mb-4">
          <label className="col-sm-3 col-form-label d-flex align-items-center">
            <FaPhoneAlt className="me-2 text-muted" /> Contact Number
          </label>
          <div className="col-sm-9">
            <input
              type="tel"
              className="form-control"
              value={contact}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                if (input.length <= 10) {
                  const formatted = input
                    .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3") // Format as 111-111-1111
                    .replace(/(\d{3})(\d{3})/, "$1-$2"); // Handle partial formats
                  setContact(formatted);
                }
              }}
              placeholder="Enter your contact number"
            />
            <small className="form-text text-muted">
              Add a phone number for account recovery and notifications.
            </small>
          </div>
        </div>

        {/* Error and Success Messages */}
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {successMessage}
          </div>
        )}
        {/* Save Changes Button */}
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Save Changes
        </button>
      </form>

      {/* Password Update */}
      {!user?.oauthProvider && (
        <form onSubmit={handleSavePasswords} className="settings-form mb-5">
          <div className="password-section mt-5">
            <h3>Security</h3>
            <p>Update your password to keep your account secure.</p>
          </div>

          <div className="form-group row mb-4">
            <label className="col-sm-3 col-form-label d-flex align-items-center">
              <FaLock className="me-2 text-muted" />
              Old Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter old password"
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <label className="col-sm-3 col-form-label d-flex align-items-center">
              <FaLock className="me-2 text-muted" /> New Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div className="form-group row mb-4">
            <label className="col-sm-3 col-form-label d-flex align-items-center">
              <FaLock className="me-2 text-muted" /> Confirm New Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}

          {/* Save Changes Button */}
          <button type="submit" className="btn btn-primary mt-4 w-100">
            Save Password Changes
          </button>
        </form>
      )}

      <style jsx>{`
        .container-fluid {
          max-width: 900px;
        }
        .profile-info h2 {
          font-weight: bold;
          color: #007bff;
        }
        .settings-form label {
          font-weight: bold;
          color: #495057;
        }
        .settings-form .btn-primary {
          background-color: #007bff;
          border: none;
          transition: all 0.3s ease;
        }
        .settings-form .btn-primary:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }
        .settings-form small {
          color: #6c757d;
        }
      `}</style>
    </div>
  );
}

export default Settings;
