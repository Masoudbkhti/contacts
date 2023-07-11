import { useEffect, useState } from "react";
import axios from "axios";
const CONTACTS_LIST_API = "http://localhost:3000/contacts";
export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {contactList.map(({ id, name, number }) => {
        return (
          <div key={id}>
            <h3>{name}</h3>
            <p>{number}</p>
          </div>
        );
      })}
    </div>
  );
};
