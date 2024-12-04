import { useEffect, useState, useRef } from "react";
import { Line, Bar, Pie, Radar, Doughnut, PolarArea } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSensorHistoryData } from "./api/sensor";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { readToken } from "@/lib/authenticate";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend);

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
  const [isAutoRefreshOn, setIsAutoRefreshOn] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5000);

  const chartRef = useRef(null);

  useEffect(() => {
    fetchLatestData();

    let interval;
    if (isAutoRefreshOn) {
      interval = setInterval(fetchLatestData, refreshInterval);
    }
    return () => clearInterval(interval);
  }, [isAutoRefreshOn, refreshInterval]);

  const fetchLatestData = async () => {
    try {
      const userFromToken = readToken();
      const data = await getSensorHistoryData(userFromToken.email);
      if (Array.isArray(data)) {
        const reversedData = data.reverse();
        setFilteredData(reversedData.slice(0, 5));
        if (data.length > 0) {
          const latest = data[0];
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

  const checkThresholds = (data) => {
    if (data.temperature > 40) {
      toast.error("Temperature exceeded 40°C!", { position: "top-right" });
    }
    if (data.humidity < 30) {
      toast.warn("Humidity below 30%!", { position: "top-right" });
    }
  };

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

  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDataType("temperature");
    setSelectedGraphType("line");
    setSelectedComparison(null);
    setFilteredData(sensorData.slice(-5));
  };

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

  const chartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 2,
    responsive: true,
    scales: {
      x: { display: true, title: { display: true, text: "Time" } },
      y: { display: true, title: { display: true, text: "Value" } }
    }
  };

  const downloadChart = () => {
    const chartInstance = chartRef.current;
    const link = document.createElement("a");
    link.href = chartInstance.toBase64Image();
    link.download = "chart.png";
    link.click();
  };

  return (
    <div className="interactive-data-hub-container">
      <h1>Interactive Data Hub</h1>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Latest Data Gauges */}
      <section className="gauge-section">
        <h2>Latest Data</h2>
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
      </section>

      {/* Controls Section */}
      <section className="controls-section">
        <h2>Controls</h2>
        <button onClick={fetchLatestData} className="btn-update">Refresh Data</button>
        <div className="filter-container">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" />
          <button onClick={handleFilter} className="btn-filter">Apply Filter</button>
          <button onClick={handleClearFilter} className="btn-clear">Clear Filter</button>
        </div>
        <div className="select-container">
          <label>
            Data Type:
            <select value={selectedDataType} onChange={(e) => setSelectedDataType(e.target.value)}>
              <option value="temperature">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="moisture">Moisture</option>
            </select>
          </label>
          <label>
            Graph Type:
            <select value={selectedGraphType} onChange={(e) => setSelectedGraphType(e.target.value)}>
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="radar">Radar Chart</option>
              <option value="doughnut">Doughnut Chart</option>
              <option value="polarArea">Polar Area Chart</option>
            </select>
          </label>
          <label>
            Compare Data:
            <select value={selectedComparison} onChange={(e) => setSelectedComparison(e.target.value)}>
              <option value="">None</option>
              <option value="temperature">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="moisture">Moisture</option>
            </select>
          </label>
        </div>
      </section>

      {/* Chart Section */}
      <section className="chart-section">
        <div className="chart-container" style={{ height: '300px' }}>
          {selectedGraphType === "line" && <Line ref={chartRef} data={chartData} options={chartOptions} />}
          {selectedGraphType === "bar" && <Bar ref={chartRef} data={chartData} options={chartOptions} />}
          {selectedGraphType === "pie" && <Pie ref={chartRef} data={chartData} options={chartOptions} />}
          {selectedGraphType === "radar" && <Radar ref={chartRef} data={chartData} options={chartOptions} />}
          {selectedGraphType === "doughnut" && <Doughnut ref={chartRef} data={chartData} options={chartOptions} />}
          {selectedGraphType === "polarArea" && <PolarArea ref={chartRef} data={chartData} options={chartOptions} />}
        </div>

        {/* Buttons positioned below chart container */}
        <div className="button-container">
          <button onClick={downloadChart} className="btn-download">Download Graph</button>
          <button onClick={() => toast.info("Navigating to Alerts...")} className="btn-alert">Go to Alert</button>
        </div>
      </section>

      <style jsx>{`
        .interactive-data-hub-container {
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1 {
          font-size: 2.5rem;
          color: #007bff;
          margin-bottom: 20px;
          font-weight: bold;
        }
        h2 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 15px;
          text-align: center;
        }
        .gauge-section, .controls-section, .chart-section {
          background: white;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 90%;
          max-width: 800px;
          margin-bottom: 20px;
        }
        .latest-data-gauges {
          display: flex;
          justify-content: space-around;
          gap: 20px;
        }
        .gauge-card {
          text-align: center;
          width: 100px;
        }
        .controls-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .filter-container {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
          width: 100%;
        }
        .select-container {
          display: flex;
          gap: 15px;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 10px;
        }
        .chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 600px;
        }
        .button-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 15px; /* Space between chart and buttons */
        }
        .btn-update, .btn-filter, .btn-clear, .btn-download, .btn-alert {
          padding: 12px 20px;
          border: none;
          border-radius: 25px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          color: white;
        }
        .btn-update, .btn-filter {
          background: #007bff;
        }
        .btn-clear {
          background: #f44336;
        }
        .btn-download {
          background: #28a745;
        }
        .btn-alert {
          background: #ffca28;
        }
        .btn-download:hover, .btn-alert:hover, .btn-update:hover, .btn-filter:hover, .btn-clear:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
