import config from "./config.json";

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

export async function getSensorHistoryDataCSV() {
  try {
    // Fetch data from your backend API
    const response = await fetch(`${config.server_api}/sensor-data`);

    if (!response.ok) {
      throw new Error("Failed to fetch sensor data");
    }

    // Parse the data
    const data = await response.json();
    return data;
  } catch (error) {
    // Instead of throwing an error, return an empty array or a meaningful message
    console.error("Error fetching sensor data:", error.message);
    return {
      error: true,
      message: "No sensor connected", // Custom message to indicate that the backend is down
    };
  }
}

export async function getSensorHistoryData(user_email) {
  try {
    // Specify the user's email for the request
    // const email = "test123@abc.com"; // Replace with the user's actual email
    // const response = await fetch(`${config.server_api}/sensor-data?email=${email}`);
    const response = await fetch(`${config.server_api}/sensor-data?email=${user_email}`);

    if (!response.ok) {
      throw new Error("Failed to fetch sensor data");
    }

    // Parse the data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error.message);
    return {
      error: true,
      message: "No sensor connected",
    };
  }
}