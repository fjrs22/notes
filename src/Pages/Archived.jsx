import Container from "../components/Container";
import Note from "../components/Note";
import useFetch from "../utils/useFetch";
export default function Archived() {
  const { notes: archive, loading } = useFetch(
    "http://localhost:5000/notes?isArchived=true"
  );
  return (
    <section className="py-5">
      <Container>
        <h1 className="font-bold text-2xl">Archived Note</h1>
        {loading ? (
          <i>loading the archive note.....</i>
        ) : (
          <div>
            {archive.length < 1 ? (
              <i>No notes added to archive yet</i>
            ) : (
              <div className="mt-10 grid grid-cols-3 gap-4">
                {archive.map((arc) => {
                  return <Note {...arc} />;
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
