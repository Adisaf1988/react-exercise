import axios from "axios";
import { useState, useEffect } from "react";
interface Customer {
  id: number;
  company: string;
  last_name: string;
  first_name: string;
  email_address: string | null;
  job_title: string;
  business_phone: string;
  home_phone: string | null;
  mobile_phone: string | null;
  fax_number: string;
  address: string;
  city: string;
  state_province: string;
  zip_postal_code: string;
  country_region: string;
  web_page: string | null;
  notes: string | null;
  attachments: {
    type: string;
    data: any[];
  };
}

export function Customers() {
  const [customer, setCustomer] = useState<Customer[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/customers")
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>Customers Table</h1>
      <table border={1} style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email Address</th>
            <th>Job Title</th>
            <th>Business Phone</th>
            <th>Home Phone</th>
            <th>Mobile Phone</th>
            <th>Fax Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State/Province</th>
            <th>Zip/Postal Code</th>
            <th>Country/Region</th>
            <th>Web Page</th>
            <th>Notes</th>
            <th>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.company}</td>
              <td>{customer.last_name}</td>
              <td>{customer.first_name}</td>
              <td>{customer.email_address || "N/A"}</td>
              <td>{customer.job_title}</td>
              <td>{customer.business_phone}</td>
              <td>{customer.home_phone || "N/A"}</td>
              <td>{customer.mobile_phone || "N/A"}</td>
              <td>{customer.fax_number}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              <td>{customer.state_province}</td>
              <td>{customer.zip_postal_code}</td>
              <td>{customer.country_region}</td>
              <td>{customer.web_page || "N/A"}</td>
              <td>{customer.notes || "N/A"}</td>
              <td>
                {customer.attachments.data.length > 0
                  ? "Attachment available"
                  : "No attachment"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
