import { useState, useEffect } from "react";
export default function useFetch(url) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const req = await fetch(url);
        if (!req.ok) throw new Error("cant get data :(");
        const res = await req.json();
        setNotes(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      getNotes();
    }, 1000);
  }, [url]);

  return { notes, loading, error };
}
