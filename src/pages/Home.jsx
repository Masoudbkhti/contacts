import { ContactList } from "../components/ContactList";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="container">
      <div>
        <h1>Contact List</h1>
        <Link to="/new-contact">
          <button>Add</button>
        </Link>
      </div>
      <ContactList />
    </div>
  );
};
