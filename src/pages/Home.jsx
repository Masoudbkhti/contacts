import { ContactList } from "../components/ContactList";

export const Home = () => {
  return (
    <div>
      <div>
        <h1>Contact List</h1>

        <button>Add</button>
      </div>
      <ContactList />
    </div>
  );
};
