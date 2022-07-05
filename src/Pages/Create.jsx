import Container from "../components/Container";
import { useState } from "react";

export default function Create() {
  const [note, setNote] = useState({ title: "", note: "" });
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

    const req = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const res = await req.json();

    console.log(res);
    setNote({ title: "", note: "" });
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
            type="submit"
            className=" bg-black py-2 px-8 text-white rounded"
          >
            Submit Note
          </button>
        </form>
      </Container>
    </section>
  );
}
