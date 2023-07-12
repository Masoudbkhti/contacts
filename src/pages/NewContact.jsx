import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export const NewContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const inputRef = useRef(null);
  const [error, setError] = useState();

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
    if (!/^09\d{9}$/.test(number)) {
      setError("Phone number starts with 09 and must be 11 characters.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    addContactHandler();
    setName("");
    setNumber("");
    inputRef.current.focus();
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Add new Contact</h1>
        <Link to="/">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
      <form onSubmit={formSubmitHandler} className="addform">
        <input
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          ref={inputRef}
        />
        <input
          type="text"
          placeholder="Enter your Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
