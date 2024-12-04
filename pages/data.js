import { RealtimeDataContext } from "@/components/layout";
import { useContext, useEffect, useState } from "react";
import { getSensorHistoryData } from "./api/sensor"; // Importing from the correct place
import { CSVLink } from "react-csv"; // For CSV export
import DatePicker from "react-datepicker"; // For date picker
import "react-datepicker/dist/react-datepicker.css"; // Date picker CSS
import { FaDownload, FaFilter, FaSyncAlt, FaTimes } from 'react-icons/fa'; // Icons for buttons
import { toast, ToastContainer } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css';  // Toast notifications CSS
import { readToken } from "@/lib/authenticate";

// Styles for various sections
const headerStyle = {
  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
  color: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const headerTextStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  margin: 0,
};

const cardStyle = {
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: '20px',
};

const tableCardStyle = {
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const datePickerStyle = {
  maxWidth: "160px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease",
};

const csvButtonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #FF6F91, #FFC107)", // Colorful gradient
  color: "#fff",
  border: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease, background 0.3s ease",
};

const tableStyle = {
  width: "100%",
  margin: "0 auto",
};

const tableRowEvenStyle = {
  backgroundColor: "#f1f5f9",
};

const tableRowOddStyle = {
  backgroundColor: "#fff",
};

const filterGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const labelStyle = {
  fontWeight: 'bold',
  marginRight: '10px',
};

const sliderStyle = {
  width: '100%',
  margin: '0 20px',
};

const rangeTextStyle = {
  marginLeft: '10px',
  fontSize: '0.9rem',
};

export default function Data() {
  const [localData, setLocalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // To store error messages
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [temperatureRange, setTemperatureRange] = useState([0, 50]); // Temperature range
  const [humidityRange, setHumidityRange] = useState([0, 100]); // Humidity range
  const [moistureRange, setMoistureRange] = useState([0, 100]); // Moisture range
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [noDataMessage, setNoDataMessage] = useState(false); // To show "No data receiving" message

  const realtimeData = useContext(RealtimeDataContext);

  // Fetch sensor data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userFromToken = readToken();
        const data = await getSensorHistoryData(userFromToken.email);

        if (data.error) {
          setErrorMessage(data.message); // Set the error message if there's a backend issue
        } else {
          setLocalData(data);
          setFilteredData(data);
          setErrorMessage(null); // Clear any previous error message

        }
      } catch (error) {
        setErrorMessage("No sensor connected"); // Fallback error message if something goes wrong
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update local data when realtime data is available
  useEffect(() => {
    if (realtimeData) {
      setLocalData((prev) => [...prev, realtimeData]);
      setNoDataMessage(false); // Reset the "No data" message when data is received
    }
  }, [realtimeData]);

  // Filter data by date range, temperature, humidity, and moisture
  const handleFilter = () => {
    const filtered = localData.filter((row) => {
      const rowDate = new Date(row.timestamp);
      const temperatureValid = row.temperature >= temperatureRange[0] && row.temperature <= temperatureRange[1];
      const humidityValid = row.humidity >= humidityRange[0] && row.humidity <= humidityRange[1];
      const moistureValid = row.moisture >= moistureRange[0] && row.moisture <= moistureRange[1];
      
      return (
        (!startDate || rowDate >= startDate) &&
        (!endDate || rowDate <= endDate) &&
        temperatureValid &&
        humidityValid &&
        moistureValid
      );
    });
    setFilteredData(filtered);
    toast.info("Data filtered based on the selected criteria", { position: 'top-center' });
  };

  // Clear all filters
  const handleClearFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setTemperatureRange([0, 50]);
    setHumidityRange([0, 100]);
    setMoistureRange([0, 100]);
    setFilteredData(localData);
    toast.success("Filters cleared", { position: 'top-center' });
  };

  // Download JSON file
  const handleDownloadJSON = () => {
    const json = JSON.stringify(filteredData, null, 2); // Format JSON data
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "sensor_data.json";
    link.click();

    URL.revokeObjectURL(url); // Cleanup the URL
  };

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* Add ToastContainer to render the notifications */}
      <ToastContainer />

      {/* Header Section */}
      <div className="header-section mb-4" style={headerStyle}>
        <h1 style={headerTextStyle}>Sensor Data Dashboard</h1>
      </div>

      {/* Filter and Action Section */}
      <div className="action-section card mb-4 p-4 shadow-sm" style={cardStyle}>
        <div className="filter-container">
          {/* Date Filter Section */}
          <div className="date-filter d-flex align-items-center" style={filterGroupStyle}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="form-control"
              style={datePickerStyle}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="form-control ml-2"
              style={datePickerStyle}
            />
          </div>

          {/* Sliders for Temperature, Humidity, Moisture */}
          <div className="slider-group" style={{ marginTop: '20px' }}>
            <div className="slider-item" style={filterGroupStyle}>
              <label style={labelStyle}>Temperature (°C)</label>
              <input
                type="range"
                min="0"
                max="50"
                value={temperatureRange[1]}
                onChange={(e) => setTemperatureRange([0, parseInt(e.target.value)])}
                className="form-range"
                style={sliderStyle}
              />
              <p style={rangeTextStyle}>0°C to {temperatureRange[1]}°C</p>
            </div>

            <div className="slider-item" style={filterGroupStyle}>
              <label style={labelStyle}>Humidity (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={humidityRange[1]}
                onChange={(e) => setHumidityRange([0, parseInt(e.target.value)])}
                className="form-range"
                style={sliderStyle}
              />
              <p style={rangeTextStyle}>0% to {humidityRange[1]}%</p>
            </div>

            <div className="slider-item" style={filterGroupStyle}>
              <label style={labelStyle}>Moisture (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={moistureRange[1]}
                onChange={(e) => setMoistureRange([0, parseInt(e.target.value)])}
                className="form-range"
                style={sliderStyle}
              />
              <p style={rangeTextStyle}>0% to {moistureRange[1]}%</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center mt-4" style={{ gap: "20px" }}>
            <button onClick={handleFilter} className="btn btn-primary" style={buttonStyle}>
              <FaFilter className="mr-2" /> Apply Filter
            </button>
            <CSVLink
              data={filteredData}
              filename="sensor_data.csv"
              className="btn"
              style={csvButtonStyle}
            >
              <FaDownload className="mr-2" /> Download CSV
            </CSVLink>
            <button onClick={handleDownloadJSON} className="btn btn-info" style={buttonStyle}>
              <FaDownload className="mr-2" /> Download JSON
            </button>
            <button onClick={handleClearFilter} className="btn btn-warning ml-3" style={buttonStyle}>
              <FaTimes className="mr-2" /> Clear Filter
            </button>
          </div>
        </div>
      </div>

      {/* Data Table with Error Message */}
      <div className="card shadow-sm p-4 mb-5 bg-white rounded" style={tableCardStyle}>
        {isLoading ? (
          <div className="text-center">
            <FaSyncAlt className="fa-spin" size={30} />
            <p>Loading data...</p>
          </div>
        ) : errorMessage ? ( // Check if there's an error (e.g., no sensor connected)
          <div className="text-center">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <table className="table table-hover align-middle" style={tableStyle}>
            <thead className="thead-dark">
              <tr>
                <th>Timestamp (MM/DD/YY)</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Moisture</th>
              </tr>
            </thead>
            <tbody>
            {filteredData?.slice(-20)?.map((row, index) => (
              <tr key={index} className="new-data-row" style={index % 2 === 0 ? tableRowEvenStyle : tableRowOddStyle}>
                <td>{new Date(row.timestamp).toLocaleString('en', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                })}</td>
                <td>{row.temperature} °C</td>
                <td>{row.humidity} %</td>
                <td>{row.moisture} %</td>
              </tr>
            ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
