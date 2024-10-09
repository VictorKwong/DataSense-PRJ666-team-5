import { RealtimeDataContext } from "@/components/layout";
import { useContext, useEffect, useState } from "react";
import { getSensorHistoryData } from "./api/sensor";

// with socket
export default function Data({ data }) {
  const [localData, setLocalData] = useState(data);

  const realtimeData = useContext(RealtimeDataContext);

  useEffect(() => {
    if (realtimeData) {
      setLocalData((prev) => {
        return [...prev, realtimeData];
      });
    }
  }, [realtimeData]);
  // console.log("data", localData);
  return (
    <div
      className="container table-responsive "
      style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}
    >
      <table className="table align-middle boder-none">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Moisture</th>
          </tr>
        </thead>
        <tbody className="boder-white">
          {localData?.slice(-15)?.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.timestamp}</td>
                <td>{row.temperature}</td>
                <td>{row.humidity}</td>
                <td>{row.moisture}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// This function runs on the server during the request
export async function getServerSideProps() {
  const data = await getSensorHistoryData();
  return {
    props: {
      data,
    },
  };
}
