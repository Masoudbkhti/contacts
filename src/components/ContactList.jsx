import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState([]);
  const toContact = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(CONTACTS_LIST_API);
        setContactList(response.data);
        setIsLoading(false);
        setDeleteStatus(Array(response.data.length).fill(false));
      } catch (e) {
        setIsLoading(false);
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  const contactDeleteHandler = async (id, index) => {
    try {
      const updatedDeleteStatus = [...deleteStatus];
      updatedDeleteStatus[index] = true;
      setDeleteStatus(updatedDeleteStatus);

      await axios.delete(`${CONTACTS_LIST_API}/${id}`);

      const response = await axios.get(CONTACTS_LIST_API);
      setContactList(response.data);
      setDeleteStatus(Array(response.data.length).fill(false));
    } catch (e) {
      console.log("Error:", e);
    }
  };

  const goToContactHandler = (id) => {
    toContact(`/contact/${id}`);
  };

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {contactList.length === 0 && !isLoading ? (
        <div>There is no Contacts in the list!</div>
      ) : (
        contactList.map(({ id, name }, index) => {
          return (
            <div key={id} className="contact-list">
              <div className="contact-list__title">
                <h3 onClick={() => goToContactHandler(id)}>{name}</h3>
              </div>
              <div className="change-btns">
                <div>
                  <Link to={`edit-contact/${id}`}>
                    <button className="btn">Edit</button>
                  </Link>
                </div>
                <div>
                  <button
                    onClick={() => contactDeleteHandler(id, index)}
                    disabled={deleteStatus[index]}
                    className="btn-del"
                  >
                    {deleteStatus[index] ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
