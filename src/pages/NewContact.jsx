import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export const NewContact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const inputRef = useRef(null);
  const [status, setStatus] = useState({ success: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const addContactHandler = async () => {
    try {
      setIsLoading(true);
      await axios.post(CONTACTS_LIST_API, { name, number });
      setIsLoading(false);
      console.log("Contact added successfully!");
      setStatus({ error: "", success: "Contact added successfully." });
    } catch (error) {
      setIsLoading(false);
      setStatus({
        error: "There is a problem. Please try leter",
        success: "",
      });
      console.log("Error adding contact:", error);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(number)) {
      setStatus({
        error: "Phone number starts with 09 and must be 11 characters.",
        success: "",
      });
      setTimeout(() => {
        setStatus({ error: "" });
      }, 5000);
    } else if (name.trim() === "") {
      setStatus({
        error: "Name field cannot be empty.",
        success: "",
      });
      setTimeout(() => {
        setStatus({ error: "" });
      }, 5000);
    } else {
      addContactHandler();
      setName("");
      setNumber("");
      setTimeout(() => {
        setStatus({ success: "", error: "" });
      }, 5000);
      inputRef.current.focus();
    }
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
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
      {status.success && <p className="success">{status.success}</p>}

      {status.error && <p className="error">{status.error}</p>}
    </div>
  );
};
