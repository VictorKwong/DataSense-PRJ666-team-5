// pages/Settings.js
import { useAtom } from "jotai";
import { userAtom } from "../store/store";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaUser, FaPhoneAlt, FaLock } from "react-icons/fa";

function Settings() {
  const [user] = useAtom(userAtom);
  const [username, setUsername] = useState(user?.username || "Not uploaded yet");
  const [contact, setContact] = useState(user?.contact || "Not uploaded yet");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!user) {
    return (
      <div className="container text-center" style={{ marginTop: "50px" }}>
        <h1>You are not logged in</h1>
        <p>Please log in to access your settings</p>
      </div>
    );
  }

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // API call to save the updated settings can go here
    setSuccessMessage("Settings saved successfully!");
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <h1 className="text-center mb-4" style={{ color: "#007bff" }}>Account Settings</h1>

      {/* Profile Info */}
      <div className="profile-info mb-4">
        <h2>Profile Information</h2>
        <p>Manage your profile details below. This information is used to personalize your experience.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="settings-form mb-5">
        {/* Email */}
        <div className="form-group row mb-4">
          <label className="col-sm-3 col-form-label d-flex align-items-center">
            <FaEnvelope className="me-2 text-muted" /> Email
          </label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              value={user.email}
              disabled
            />
            <small className="form-text text-muted">Email is not editable.</small>
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
              value={username !== "Not uploaded yet" ? username : ""}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <small className="form-text text-muted">
              {username === "Not uploaded yet" ? "Username not uploaded yet." : "Update your username."}
            </small>
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
              value={contact !== "Not uploaded yet" ? contact : ""}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
            />
            <small className="form-text text-muted">
              {contact === "Not uploaded yet" ? "Contact number not uploaded yet." : "Add a phone number for account recovery and notifications."}
            </small>
          </div>
        </div>

        {/* Password Update */}
        <div className="password-section mt-5">
          <h3>Security</h3>
          <p>Update your password to keep your account secure.</p>
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
          Save Changes
        </button>
      </form>

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
