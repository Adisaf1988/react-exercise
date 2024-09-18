import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface OrderDetail {
  id: number;
  order_date: string;
  ship_name: string;
  ship_address: string;
  ship_city: string;
  ship_state_province: string;
  status_name: string;
}

export function OrdersDetails() {
  const { status } = useParams<{ status: string }>(); // לוודא שהסוג של status הוא string
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);

  useEffect(() => {
    if (status) {
      axios
        .get(`http://localhost:4000/orders-details/${status}`) 
        .then((response) => {
          setOrderDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [status]); 

  return (
    <>
      <h1>Order Details - Status {status}</h1>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order Date</th>
            <th>Ship Name</th>
            <th>Ship Address</th>
            <th>Ship City</th>
            <th>Ship State</th>
            <th>Order Status Name</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((orderDetail, index) => (
            <tr key={index}>
              <td>{orderDetail.id}</td>
              <td>{orderDetail.order_date}</td>
              <td>{orderDetail.ship_name}</td>
              <td>{orderDetail.ship_address}</td>
              <td>{orderDetail.ship_city}</td>
              <td>{orderDetail.ship_state_province}</td>
              <td>{orderDetail.status_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
