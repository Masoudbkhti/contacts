import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export const NewContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const addContactHandler = async () => {
    try {
      await axios.post(CONTACTS_LIST_API, { name, number });
      console.log("Contact added successfully!");
    } catch (error) {
      console.log("Error adding contact:", error);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addContactHandler();
    setName("");
    setNumber("");
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Add new Contact</h1>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
      <form onSubmit={formSubmitHandler} className="addform">
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
