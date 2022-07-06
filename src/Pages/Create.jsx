import Container from "../components/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", note: "" });
  const [loading, setLoading] = useState(false);
  const createNote = () => {
    return {
      ...note,
      isArchived: false,
      createdAt: new Date().toLocaleString(),
    };
  };
  const submitNote = async (e) => {
    e.preventDefault();
    const note = createNote();
    if (note.title.length < 1 || note.note.length < 1) {
      return alert("cant submit empty value");
    }

    setLoading(true);
    const req = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const res = await req.json();

    setNote({ title: "", note: "" });
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  };
  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Create Note</h1>
        <form
          onSubmit={(e) => submitNote(e)}
          className="w-1/2 mt-10 flex flex-col space-y-2 items-center"
        >
          <input
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            value={note.title}
            type="text"
            placeholder="Title"
            className="w-full bg-black/80 p-2 rounded outline-none text-white"
          />
          <textarea
            onChange={(e) => {
              setNote({ ...note, note: e.target.value });
            }}
            value={note.note}
            rows="10"
            placeholder="Note"
            className="w-full bg-black/80 p-2 rounded outline-none text-white"
          ></textarea>
          <button
            disabled={loading}
            type="submit"
            className={`bg-black py-2 px-8 text-white rounded  ${
              loading ? "bg-black/50" : ""
            }`}
          >
            Submit Note
          </button>
        </form>
      </Container>
    </section>
  );
}
