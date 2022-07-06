import { useNavigate, useParams } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import useFetch from "../utils/useFetch";
import Container from "../components/Container";
export default function Note() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    notes: note,
    loading,
    error,
  } = useFetch(`http://localhost:5000/notes/${id}`);

  async function deleteHandler() {
    if (!confirm("are you sure to delete this note ? "))
      return console.log("kay");
    const req = await fetch("http://localhost:5000/notes/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }
  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Note {id}</h1>
        {loading ? (
          <i>Loading the note....</i>
        ) : (
          <NoteView note={note} error={error} deleteHandler={deleteHandler} />
        )}
      </Container>
    </section>
  );
}
function NoteView({ note, error, deleteHandler }) {
  return error ? (
    <i>{error}</i>
  ) : (
    <div className="mt-10 w-3/4">
      <h1 className="font-bold">{note.title}</h1>
      <p>{note.note}</p>
      <div className="mt-14 flex items-center justify-between">
        <p className="">{note.createdAt}</p>
        <FiTrash onClick={deleteHandler} className="text-2xl cursor-pointer" />
      </div>
    </div>
  );
}
