import { useState, useEffect } from "react";
import Container from "../components/Container";
import Note from "../components/Note";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const req = await fetch("http://localhost:5000/notes");
      const res = await req.json();
      setNotes(res);
      setLoading(false);
    };
    setTimeout(() => {
      getNotes();
    }, 1000);
  }, []);
  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">All Notes</h1>
        {loading ? <i>Loading all the notes....</i> : <Notes notes={notes} />}
      </Container>
    </section>
  );
}
function Notes({ notes }) {
  return (
    <div>
      {notes.length < 1 ? (
        <i>No note added yet</i>
      ) : (
        <div className="mt-10 grid grid-cols-3 gap-4">
          {notes.map((note) => {
            return <Note {...note} key={note.id} />;
          })}
        </div>
      )}
    </div>
  );
}
