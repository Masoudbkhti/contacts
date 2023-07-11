import { Routes, Route } from "react-router-dom";
import { Home } from "../src/pages/Home";
import { NewContact } from "../src/pages/NewContact";
import { EditContact } from "../src/pages/EditContact";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-contact" element={<NewContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
}

export default App;
