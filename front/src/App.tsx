import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Products } from "./components/pages/products";
import { Customers } from "./components/pages/customers";
import { OrdersDetails } from "./components/pages/orders-details";
import { OrdersFullData } from "./components/pages/orders-full-data";
import Chart from "./components/pages/chart";
import { Root } from "./components/pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "/orders-details/:status",
        element: <OrdersDetails />,
      },
      {
        path: "orders-full-data",
        element: <OrdersFullData />,
      },
      {
        path: "chart",
        element: <Chart />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5173/products")
        }
      >
        Products
      </button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5173/customers")
        }
      >
        Customers
      </button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5173/orders-details/new")
        }
      >
        Orders Details
      </button>
      <button
        onClick={() =>
          (window.location.href = "http://localhost:5173/orders-full-data")
        }
      >
        Orders Full Data
      </button>
      <button
        onClick={() => (window.location.href = "http://localhost:5173/chart")}
      >
        Report
      </button>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
