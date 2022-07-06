import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { FiTrash } from "react-icons/fi";
import useFetch from "../utils/useFetch";
export default function Note() {
  const { id } = useParams();

  const {
    notes: note,
    loading,
    error,
  } = useFetch(`http://localhost:5000/notes/${id}`);

  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Note {id}</h1>
        {loading ? (
          <i>Loading the note....</i>
        ) : (
          <NoteView note={note} error={error} />
        )}
      </Container>
    </section>
  );
}
function NoteView({ note, error }) {
  return error ? (
    <i>{error}</i>
  ) : (
    <div className="mt-10 w-3/4">
      <h1 className="font-bold">{note.title}</h1>
      <p>{note.note}</p>
      <div className="mt-14 flex items-center justify-between">
        <p className="">{note.createdAt}</p>
        <FiTrash className="text-2xl" />
      </div>
    </div>
  );
}
