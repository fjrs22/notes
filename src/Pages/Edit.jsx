import Container from "../components/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Edit() {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getNote(id) {
      const req = await fetch("http://localhost:5000/notes/" + id);
      const res = await req.json();
      setNote(res);
    }
    getNote(id);
  }, [id]);
  async function submitEdit(e) {
    e.preventDefault();

    setLoading(true);
    const req = await fetch("http://localhost:5000/notes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1000);
  }

  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Edit note {id}</h1>

        <form
          onSubmit={(e) => {
            submitEdit(e);
          }}
          className="w-1/2 mt-10 flex flex-col space-y-2 items-center"
        >
          <input
            value={note?.title}
            onChange={(e) => {
              setNote({ ...note, title: e.target.value });
            }}
            type="text"
            placeholder="Title"
            className="w-full bg-black/80 p-2 rounded outline-none text-white"
          />
          <textarea
            onChange={(e) => {
              setNote({ ...note, note: e.target.value });
            }}
            value={note?.note}
            rows="10"
            placeholder="Note"
            className="w-full bg-black/80 p-2 rounded outline-none text-white"
          ></textarea>
          <button
            disabled={loading}
            type="submit"
            className={`bg-black py-2 px-8 text-white rounded ${
              loading ? "bg-black/50" : ""
            }`}
          >
            Submit Edit
          </button>
        </form>
      </Container>
    </section>
  );
}
