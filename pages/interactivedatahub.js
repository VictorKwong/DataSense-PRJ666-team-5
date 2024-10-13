import { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';  // Import necessary components
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSensorHistoryData } from "./api/sensor";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function InteractiveDataHub() {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState({ temperature: 0, humidity: 0, moisture: 0 });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("temperature");
  const [selectedComparison, setSelectedComparison] = useState(null);
  const [selectedGraphType, setSelectedGraphType] = useState("line");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isAutoRefreshOn, setIsAutoRefreshOn] = useState(false); // Auto-refresh toggle
  const [refreshInterval, setRefreshInterval] = useState(5000); // Refresh interval

  // Fetch data on mount and auto-refresh
  useEffect(() => {
    fetchLatestData();

    let interval;
    if (isAutoRefreshOn) {
      interval = setInterval(fetchLatestData, refreshInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoRefreshOn, refreshInterval]);

  // Fetch latest data function
  const fetchLatestData = async () => {
    try {
      const data = await getSensorHistoryData();
      if (Array.isArray(data)) {
        setSensorData(data);
        setFilteredData(data.slice(-5)); // Show the last 5 data points initially
        if (data.length > 0) {
          const latest = data[data.length - 1];
          setLatestData({
            temperature: latest.temperature,
            humidity: latest.humidity,
            moisture: latest.moisture,
          });
          checkThresholds(latest);
        } else {
          setErrorMessage("No sensor connected");
        }
      } else {
        setErrorMessage("No valid data received");
      }
    } catch (error) {
      setErrorMessage("No sensor connected");
    }
  };

  // Check if data crosses any threshold and notify
  const checkThresholds = (data) => {
    if (data.temperature > 40) {
      toast.error("Temperature exceeded 40°C!", { position: "top-right" });
    }
    if (data.humidity < 30) {
      toast.warn("Humidity below 30%!", { position: "top-right" });
    }
  };

  // Filter data by date range
  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = sensorData.filter((entry) => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= startDate && entryDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(sensorData.slice(-5));
    }
  };

  // Clear all filters and selections
  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDataType("temperature");
    setSelectedGraphType("line");
    setSelectedComparison(null);
    setFilteredData(sensorData.slice(-5));
  };

  // Prepare chart data
  const chartData = {
    labels: filteredData.map((entry) => new Date(entry.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: selectedDataType === "temperature" ? "Temperature (°C)" : selectedDataType === "humidity" ? "Humidity (%)" : "Moisture (%)",
        data:
          selectedDataType === "temperature"
            ? filteredData.map((entry) => entry.temperature)
            : selectedDataType === "humidity"
            ? filteredData.map((entry) => entry.humidity)
            : filteredData.map((entry) => entry.moisture),
        borderColor: selectedDataType === "temperature" ? "rgba(255, 99, 132, 1)" : selectedDataType === "humidity" ? "rgba(54, 162, 235, 1)" : "rgba(75, 192, 192, 1)",
        backgroundColor: selectedDataType === "temperature" ? "rgba(255, 99, 132, 0.2)" : selectedDataType === "humidity" ? "rgba(54, 162, 235, 0.2)" : "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
      selectedComparison && {
        label: selectedComparison === "temperature" ? "Temperature (°C)" : selectedComparison === "humidity" ? "Humidity (%)" : "Moisture (%)",
        data:
          selectedComparison === "temperature"
            ? filteredData.map((entry) => entry.temperature)
            : selectedComparison === "humidity"
            ? filteredData.map((entry) => entry.humidity)
            : filteredData.map((entry) => entry.moisture),
        borderColor: selectedComparison === "temperature" ? "rgba(255, 159, 64, 1)" : selectedComparison === "humidity" ? "rgba(75, 192, 192, 1)" : "rgba(153, 102, 255, 1)",
        backgroundColor: selectedComparison === "temperature" ? "rgba(255, 159, 64, 0.2)" : selectedComparison === "humidity" ? "rgba(75, 192, 192, 0.2)" : "rgba(153, 102, 255, 0.2)",
        fill: true,
      },
    ].filter(Boolean),
  };

  return (
    <div className="interactive-data-hub-container">
      <h1>Interactive Data Hub</h1>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Latest Data Circular Gauges */}
      <div className="latest-data-gauges">
        <div className="gauge-card">
          <CircularProgressbar
            value={latestData.temperature}
            text={`${latestData.temperature}°C`}
            styles={buildStyles({
              pathColor: `rgba(255, 99, 132, ${latestData.temperature / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
            })}
          />
          <p>Temperature</p>
        </div>
        <div className="gauge-card">
          <CircularProgressbar
            value={latestData.humidity}
            text={`${latestData.humidity}%`}
            styles={buildStyles({
              pathColor: `rgba(54, 162, 235, ${latestData.humidity / 100})`,
              textColor: "#36a2eb",
              trailColor: "#d6d6d6",
            })}
          />
          <p>Humidity</p>
        </div>
        <div className="gauge-card">
          <CircularProgressbar
            value={latestData.moisture}
            text={`${latestData.moisture}%`}
            styles={buildStyles({
              pathColor: `rgba(75, 192, 192, ${latestData.moisture / 100})`,
              textColor: "#4bc0c0",
              trailColor: "#d6d6d6",
            })}
          />
          <p>Moisture</p>
        </div>
      </div>

      {/* Manual Update and Auto-Refresh Toggle */}
      <div className="manual-update">
        <button onClick={fetchLatestData} className="btn-update">
          Refresh Data
        </button>
        <div className="auto-refresh-toggle">
          <label>
            <input
              type="checkbox"
              checked={isAutoRefreshOn}
              onChange={() => setIsAutoRefreshOn(!isAutoRefreshOn)}
            />
            Auto-Refresh
          </label>
        </div>
      </div>

      {/* Date Filter */}
      <div className="filter-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="date-picker"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
          className="date-picker"
        />
        <button onClick={handleFilter} className="btn-filter">
          Apply Filter
        </button>
        <button onClick={handleClearFilter} className="btn-clear">
          Clear Filter
        </button>
      </div>

      {/* Data Type and Graph Type Selection */}
      <div className="selection-container">
        <label>
          Select Data Type:
          <select value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)} className="select-style">
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="moisture">Moisture</option>
          </select>
        </label>
        <label>
          Select Graph Type:
          <select value={selectedGraphType} onChange={(e) => setSelectedGraphType(e.target.value)} className="select-style">
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </label>
        <label>
          Compare with:
          <select value={selectedComparison} onChange={(e) => setSelectedComparison(e.target.value)} className="select-style">
            <option value="">None</option>
            <option value="temperature">Temperature</option>
            <option value="humidity">Humidity</option>
            <option value="moisture">Moisture</option>
          </select>
        </label>
      </div>

      {errorMessage ? (
        <div className="error-message">
          <h2>{errorMessage}</h2>
        </div>
      ) : (
        <div className="chart-container">
          {selectedGraphType === "line" && <Line data={chartData} options={{ maintainAspectRatio: false }} />}
          {selectedGraphType === "bar" && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}
          {selectedGraphType === "pie" && <Pie data={chartData} options={{ maintainAspectRatio: false }} />}
        </div>
      )}

      <style jsx>{`
        .interactive-data-hub-container {
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
          min-height: 100vh;
        }
        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 40px;
          color: #333;
        }
        .latest-data-gauges {
          display: flex;
          justify-content: space-around;
          margin-bottom: 40px;
        }
        .gauge-card {
          width: 150px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .manual-update {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .btn-update {
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .btn-update:hover {
          background-color: #218838;
        }
        .auto-refresh-toggle {
          margin-left: 20px;
          display: flex;
          align-items: center;
        }
        .auto-refresh-toggle label {
          font-size: 1rem;
          margin-left: 5px;
        }
        .filter-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          gap: 15px;
        }
        .date-picker {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .btn-filter, .btn-clear {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .btn-clear {
          background-color: #f44336;
        }
        .btn-filter:hover {
          background-color: #0056b3;
        }
        .btn-clear:hover {
          background-color: #c62828;
        }
        .selection-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          gap: 15px;
        }
        label {
          font-size: 1.2rem;
          margin-right: 10px;
        }
        .select-style {
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          margin-left: 10px;
          outline: none;
          transition: border 0.3s ease;
        }
        .select-style:focus {
          border: 1px solid #007bff;
        }
        .chart-container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          max-width: 800px;
          margin: 40px auto;
        }
        .error-message {
          text-align: center;
          color: red;
          font-size: 1.5rem;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}
