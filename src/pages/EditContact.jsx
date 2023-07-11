import { Link, useParams } from "react-router-dom";
import { useState } from "react";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";
export const EditContact = () => {
  const id = useParams();
  const [name, setName] = useState([]);
  const [number, setNumber] = useState([]);

  const editFormHandler = async () => {
    try {
      await axios.put(CONTACTS_LIST_API, { name: name });
      await axios.put(CONTACTS_LIST_API, { number: number });
    } catch (e) {
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
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};
