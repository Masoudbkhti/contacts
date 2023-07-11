import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";
export const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState([]);
  const [number, setNumber] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const editFormHandler = async (e) => {
    e.preventDefault();
    const requestBody = { name, number };
    try {
      setIsLoading(true);
      await axios.put(`${CONTACTS_LIST_API}/${id}`, requestBody);
      setIsLoading(false);
      navigateTo("/");
    } catch (e) {
      setIsLoading(false);
      console.log("Error:", e);
    }
  };
  return (
    <div className="container">
      <div className="title">
        <h1>Edit Contact</h1>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
      <form onSubmit={editFormHandler} className="addform">
        <input
          type="text"
          placeholder="Edit your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Edit your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button className="btn" type="submit">
          Edit
        </button>
      </form>
      {isLoading ? (
        <div>Redirecting to Contact List. Please wait...</div>
      ) : null}
    </div>
  );
};
