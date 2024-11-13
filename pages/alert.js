// Alerts.js
import { useState, useEffect, useContext } from "react";
import styles from "../styles/Alerts.module.css";
import { NotificationsContext } from "@/components/layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Alerts() {
  // Access notifications from the NotificationsContext
  const { notifications, clearNotifications } = useContext(NotificationsContext);

  // State to manage threshold inputs and conditions
  const [temperatureThreshold, setTemperatureThreshold] = useState(0);
  const [humidityThreshold, setHumidityThreshold] = useState(0);
  const [moistureThreshold, setMoistureThreshold] = useState(0);
  const [temperatureCondition, setTemperatureCondition] = useState("exceeds");
  const [humidityCondition, setHumidityCondition] = useState("below");
  const [moistureCondition, setMoistureCondition] = useState("below");

  // Initialize thresholds and conditions from localStorage on initial render
  useEffect(() => {
    setTemperatureThreshold(localStorage.getItem("temperatureThreshold") || 0);
    setHumidityThreshold(localStorage.getItem("humidityThreshold") || 0);
    setMoistureThreshold(localStorage.getItem("moistureThreshold") || 0);

    setTemperatureCondition(localStorage.getItem("temperatureCondition") || "exceeds");
    setHumidityCondition(localStorage.getItem("humidityCondition") || "below");
    setMoistureCondition(localStorage.getItem("moistureCondition") || "below");
  }, []);

  // Save thresholds to localStorage and show a success notification
  const saveThresholds = () => {
    localStorage.setItem("temperatureThreshold", temperatureThreshold);
    localStorage.setItem("temperatureCondition", temperatureCondition);
    localStorage.setItem("humidityThreshold", humidityThreshold);
    localStorage.setItem("humidityCondition", humidityCondition);
    localStorage.setItem("moistureThreshold", moistureThreshold);
    localStorage.setItem("moistureCondition", moistureCondition);

    toast.success("Thresholds and conditions saved successfully!", { position: "top-right" });
  };

  // Clear all thresholds
  const clearAllThresholds = () => {
    setTemperatureThreshold(0);
    setHumidityThreshold(0);
    setMoistureThreshold(0);
    setTemperatureCondition("exceeds");
    setHumidityCondition("below");
    setMoistureCondition("below");

    localStorage.removeItem("temperatureThreshold");
    localStorage.removeItem("temperatureCondition");
    localStorage.removeItem("humidityThreshold");
    localStorage.removeItem("humidityCondition");
    localStorage.removeItem("moistureThreshold");
    localStorage.removeItem("moistureCondition");

    toast.info("All thresholds and conditions cleared", { position: "top-right" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Set Alert Thresholds</h1>
      <p className={styles.description}>Define thresholds and conditions for temperature, humidity, and moisture to receive alerts.</p>

      <div className={styles.formGroup}>
        <label>Temperature Threshold (°C)</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={temperatureThreshold}
            onChange={(e) => setTemperatureThreshold(e.target.value)}
            className="form-control me-2"
          />
          <select
            value={temperatureCondition}
            onChange={(e) => setTemperatureCondition(e.target.value)}
            className="form-select"
          >
            <option value="exceeds">Exceeds</option>
            <option value="below">Below</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Humidity Threshold (%)</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={humidityThreshold}
            onChange={(e) => setHumidityThreshold(e.target.value)}
            className="form-control me-2"
          />
          <select
            value={humidityCondition}
            onChange={(e) => setHumidityCondition(e.target.value)}
            className="form-select"
          >
            <option value="exceeds">Exceeds</option>
            <option value="below">Below</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Moisture Threshold (%)</label>
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={moistureThreshold}
            onChange={(e) => setMoistureThreshold(e.target.value)}
            className="form-control me-2"
          />
          <select
            value={moistureCondition}
            onChange={(e) => setMoistureCondition(e.target.value)}
            className="form-select"
          >
            <option value="exceeds">Exceeds</option>
            <option value="below">Below</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={saveThresholds} className="btn btn-primary me-2">Save Thresholds</button>
        <button onClick={clearAllThresholds} className="btn btn-danger">Clear All Thresholds</button>
      </div>

      <div className={`${styles.alertHistoryHeader} mt-5`}>
        <h2>Alert History</h2>
        <button onClick={clearNotifications} className="btn btn-secondary">Clear Alert History</button>
      </div>

      <ul className="list-group">
        {notifications.length > 0 ? (
          notifications.map((alert, index) => (
            <li key={index} className="list-group-item">
              <strong>{alert.type.toUpperCase()} Alert ({alert.condition}):</strong> {alert.message} <br />
              <span className="text-muted">Timestamp: {alert.timestamp}</span>
            </li>
          ))
        ) : (
          <p>No alerts in history</p>
        )}
      </ul>
    </div>
  );
}
