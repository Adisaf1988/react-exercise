import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";

const YourComponent = () => {
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);
  const [orderCounts, setOrderCounts] = useState<number[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/chart");
        const data = response.data;

        console.log("Server response:", data);

        if (Array.isArray(data)) {
          const names = data.map(
            (employee) =>
              `${employee.employee_first_name} ${employee.employee_last_name}`
          );
          const orders = data.map((employee) => employee.number_of_orders);

          setEmployeeNames(names);
          setOrderCounts(orders);

          console.log("Employee Names:", names);
          console.log("Order Counts:", orders);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  console.log("Rendering BarChart with:", { employeeNames, orderCounts });

  return (
    <div>
      <h1>Report</h1>
      <BarChart
        width={1200}
        series={[{ data: orderCounts }]}
        height={500}
        xAxis={[{ data: employeeNames, scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
};

export default YourComponent;
