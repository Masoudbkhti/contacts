import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";
export const Contact = () => {
  const { id } = useParams();
  const [contactDetail, setContactDetail] = useState({});
  const { name, number } = contactDetail;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${CONTACTS_LIST_API}/${id}`);
        setIsLoading(false);

        setContactDetail(response.data);
      } catch (e) {
        setIsLoading(false);
        setError("Data could not be loaded. Please try leter.");

        console.log("Error:", e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container">
      {isLoading ? <div>Loading...</div> : null}
      {error && <div className="error">{error}</div>}
      <h1 className="title">Contact {id}</h1>
      <h2>Name: {name}</h2>
      <h2>Number: {number}</h2>
      <Link to="/">
        <button className="btn">Back to Contact List</button>
      </Link>
    </div>
  );
};
