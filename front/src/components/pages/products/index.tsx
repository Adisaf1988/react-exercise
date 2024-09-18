import axios from "axios";
import { useState, useEffect } from "react";
interface Product {
  supplier_ids: string;
  id: number;
  product_code: string;
  product_name: string;
  description: string | null;
  standard_cost: string;
  list_price: string;
  reorder_level: number;
  target_level: number;
  quantity_per_unit: string;
  discontinued: number;
  minimum_reorder_quantity: number;
  category: string;
  attachments: {
    type: string;
    data: any[];
  };
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>Products Table</h1>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Product ID</th>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Standard Cost</th>
            <th>List Price</th>
            <th>Reorder Level</th>
            <th>Target Level</th>
            <th>Quantity per Unit</th>
            <th>Discontinued</th>
            <th>Minimum Reorder Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.supplier_ids}</td>
              <td>{product.id}</td>
              <td>{product.product_code}</td>
              <td>{product.product_name}</td>
              <td>{product.description || "No description available"}</td>
              <td>{product.standard_cost}</td>
              <td>{product.list_price}</td>
              <td>{product.reorder_level}</td>
              <td>{product.target_level}</td>
              <td>{product.quantity_per_unit}</td>
              <td>{product.discontinued ? "Yes" : "No"}</td>
              <td>{product.minimum_reorder_quantity}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
