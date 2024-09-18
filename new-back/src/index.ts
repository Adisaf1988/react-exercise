import express from "express";
import dotenv from "dotenv";
import mysql2 from "mysql2/promise";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
async function initConnection() {
  try {
    const connection = await mysql2
      .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_SCHEMA,
        port: Number(process.env.MYSQL_PORT) || 3306,
      })
      .getConnection();

    console.log("Connected to the database!");

    app.get("/products", async (req, res) => {
      try {
        const [results] = await connection.query("SELECT * FROM products");
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching product");
      }
    });

    app.get("/customers", async (req, res) => {
      try {
        const [results] = await connection.query("SELECT * FROM customers");
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching customers");
      }
    });

    app.get("/orders-details/:status", async (req, res) => {
      try {
        const status = req.params.status;

        if (!status) {
          return res.status(400).send("Status is required");
        }

        const query = `
          SELECT 
            orders.id,
            orders.order_date,
            orders.ship_name,
            orders.ship_address,
            orders.ship_city,
            orders.ship_state_province,
            orders_status.status_name
          FROM
            orders
          JOIN 
            orders_status ON orders.status_id = orders_status.id
          WHERE
            orders_status.status_name = ?;
        `;

        const [results] = await connection.execute(query, [status]);

        res.json(results);
        console.log(results);
      } catch (error) {
        console.error("Error fetching orders details:", error);
        res.status(500).send("Error fetching orders");
      }
    });

    app.get("/orders-full-data", async (req, res) => {
      try {
        const query = `
          SELECT 
            orders.id,
            customers.first_name AS customer_first_name,
            customers.last_name AS customer_last_name,
            employees.first_name AS employee_first_name,
            employees.last_name AS employee_last_name,
            shippers.company AS shipper_company
          FROM
            orders
            JOIN customers ON orders.customer_id = customers.id
            JOIN employees ON orders.employee_id = employees.id
            JOIN shippers ON orders.shipper_id = shippers.id
          ORDER BY orders.id
        `;
        const [results] = await connection.query(query);
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching orders full data");
      }
    });

    app.get("/chart", async (req, res) => {
      try {
        const query = `
          SELECT 
              employees.id AS employee_id,
              employees.first_name AS employee_first_name,
              employees.last_name AS employee_last_name,
              COUNT(orders.id) AS number_of_orders
          FROM
              orders
          JOIN
             employees ON orders.employee_id = employees.id
          GROUP BY
              employees.id,
              employees.first_name,
              employees.last_name
          ORDER BY
              number_of_orders;
        `;

        const [results] = await connection.query(query);

        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching employee order data");
      }
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
});

initConnection();
