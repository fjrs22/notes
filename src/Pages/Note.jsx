import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
export default function Note() {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    async function getNote(id) {
      const req = await fetch("http://localhost:5000/notes/" + id);
      const res = await req.json();
      setNote(res);
      setLoading(false);
    }
    setTimeout(() => {
      getNote(id);
    }, 1000);
  }, [id]);
  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Note {id}</h1>
        {loading ? (
          <i>Loading the note....</i>
        ) : (
          <div className="mt-10 w-3/4">
            <h1 className="font-bold">{note.title}</h1>
            <p>{note.note}</p>
            <div className="mt-14 flex items-center justify-between">
              <p className="">{note.createdAt}</p>
              <FiTrash className="text-2xl" />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
