import Container from "../components/Container";
import { useState, useEffect } from "react";
import Note from "../components/Note";
export default function Archived() {
  const [archive, setArchive] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getArchive() {
      const req = await fetch("http://localhost:5000/notes?isArchived=true");
      const res = await req.json();
      setArchive(res);
      setLoading(false);
    }
    setTimeout(() => {
      getArchive();
    }, 1000);
  }, []);
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
