import Container from "../components/Container";
import Note from "../components/Note";
import useFetch from "../utils/useFetch";

export default function Home() {
  const { notes, loading, error } = useFetch("http://localhost:5000/notes");

  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">All Notes</h1>
        {loading ? (
          <i>Loading all the notes....</i>
        ) : (
          <Notes notes={notes} error={error} />
        )}
      </Container>
    </section>
  );
}
function Notes({ notes, error }) {
  return (
    <div>
      {error ? (
        <i>{error}</i>
      ) : (
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
      )}
    </div>
  );
}
