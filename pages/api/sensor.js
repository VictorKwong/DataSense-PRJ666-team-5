import config from "./config.json";

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

export async function getSensorHistoryData() {
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
    // Handle errors gracefully and throw a meaningful message
    throw new Error(
      error.message || "An error occurred while fetching sensor data"
    );
  }
}
