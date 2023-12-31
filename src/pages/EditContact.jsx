import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const CONTACTS_LIST_API = "http://localhost:3000/contacts";
import axios from "axios";
export const EditContact = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigateTo = useNavigate();
  const [status, setStatus] = useState({ error: "", success: "" });
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    const fetchData = async () => {
      try {
        setInputLoading(true);
        const response = await axios.get(`${CONTACTS_LIST_API}/${id}`);

        setInputLoading(false);
        const { name, number } = response.data;
        setName(name);
        setNumber(number);
      } catch (e) {
        setInputLoading(false);

        setStatus({
          error: "Data could not be loaded. Please try leter.",
          success: "",
        });
        console.log("Error:", e);
      }
    };
    fetchData();
  }, [id]);
  const editFormHandler = async (e) => {
    e.preventDefault();
    if (!/^09\d{9}$/.test(number)) {
      setStatus({
        error: "Phone number starts with 09 and must be 11 characters.",
        success: "",
      });
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else if (name.trim() == "") {
      setStatus({
        error: "Name field cannot be empty.",
        success: "",
      });
      setTimeout(() => {
        setStatus({ error: "" });
      }, 5000);
    } else {
      const requestBody = { name, number };
      try {
        setIsLoading(true);
        await axios.put(`${CONTACTS_LIST_API}/${id}`, requestBody);
        setIsLoading(false);
        setIsRedirecting(true);
        navigateTo("/");
      } catch (e) {
        setIsLoading(false);
        setIsRedirecting(false);
        setStatus({
          error: "There is a problem. Please try leter.",
          success: "",
        });
        console.log("Error:", e);
      }
    }
  };
  return (
    <div className="container">
      <div className="title">
        <h1>Edit Contact</h1>
        <Link to="/">
          <button className="btn">Back to Home</button>
        </Link>
      </div>
      <form onSubmit={editFormHandler} className="addform">
        <input
          type="text"
          placeholder={inputLoading ? "Loading..." : "request faild!"}
          value={name}
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          ref={inputRef}
        />
        <input
          type="text"
          placeholder={inputLoading ? "Loading..." : "request faild!"}
          value={number}
          defaultValue={number}
          onChange={(e) => setNumber(e.target.value)}
          className="input"
        />
        <button className="btn" type="submit">
          {isLoading ? "Editing..." : "Edit"}
        </button>
      </form>
      {isRedirecting ? (
        <div>Redirecting to Contact List. Please wait...</div>
      ) : null}
      {status.error && <p className="error">{status.error}</p>}
    </div>
  );
};
