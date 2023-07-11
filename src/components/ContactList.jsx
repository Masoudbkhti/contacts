import { useEffect, useState } from "react";
import axios from "axios";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";

export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(CONTACTS_LIST_API);
        setContactList(response.data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  const contactDeleteHandler = async (id) => {
    try {
      setIsDeleting(true);
      await axios.delete(`${CONTACTS_LIST_API}/${id}`);
      setIsDeleting(false);
      const response = await axios.get(CONTACTS_LIST_API);
      setContactList(response.data);
    } catch (e) {
      setIsDeleting(false);
      console.log("Error:", e);
    }
  };

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {contactList.length === 0 && !isLoading ? (
        <div>There is no Contacts in the list!</div>
      ) : (
        contactList.map(({ id, name, number }) => {
          return (
            <div key={id} className="contact-list">
              <div>
                <h3>{name}</h3>
                <p>{number}</p>
              </div>
              <div className="change-btns">
                <div>
                  <button>Edit</button>
                </div>
                <div>
                  <button onClick={() => contactDeleteHandler(id)}>
                    {isDeleting ? <div>Deleting...</div> : <div>Delete</div>}
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
