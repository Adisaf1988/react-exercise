import axios from "axios";
import { useState, useEffect } from "react";
interface OrderFullData {
  id: number;
  customer_first_name: string;
  customer_last_name: string;
  employee_first_name: string;
  employee_last_name: string;
  shipper_company: string;
}

export function OrdersFullData() {
  const [orderFullData, setOrderFullData] = useState<OrderFullData[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/orders-full-data`)
      .then((response) => {
        setOrderFullData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders full data:", error);
      });
  }, []);
  return (
    <>
      <h1>Order Full Data</h1>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer First Name</th>
            <th>Customer Last Name</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Shipper Company</th>
          </tr>
        </thead>
        <tbody>
          {orderFullData.map((orderFullData, index) => (
            <tr key={index}>
              <td>{orderFullData.id}</td>
              <td>{orderFullData.customer_first_name}</td>
              <td>{orderFullData.customer_last_name}</td>
              <td>{orderFullData.employee_first_name}</td>
              <td>{orderFullData.employee_last_name}</td>
              <td>{orderFullData.shipper_company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
