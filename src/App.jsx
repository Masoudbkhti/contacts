import { Routes, Route } from "react-router-dom";
import { Home } from "../src/pages/Home";
import { NewContact } from "../src/pages/NewContact";
import { EditContact } from "../src/pages/EditContact";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
        <Route path="/contact/:id" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
