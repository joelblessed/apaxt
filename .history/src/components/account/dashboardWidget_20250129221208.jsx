import React from "react";
import { Bar } from "react-chartjs-2";

function DashboardWidgets() {
  const data = {
    labels: ["Users", "Orders", "Revenue"],
    datasets: [
      {
        label: "Stats",
        data: [100, 200, 300],
        backgroundColor: ["blue", "green", "orange"],
      },
    ],
  };

  return (
    <div>
      <h3>Statistics</h3>
      <Bar data={data} />
    </div>
  );
}

export default DashboardWidgets