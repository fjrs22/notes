import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Create from "./Pages/Create";
import Note from "./Pages/Note";
import Archived from "./Pages/Archived";
import Edit from "./Pages/Edit";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create" element={<Create />} />
        <Route path="note/:id" element={<Note />} />
        <Route path="edit/:id" element={<Edit />} />
        <Route path="archived" element={<Archived />} />
      </Routes>
    </>
  );
}
