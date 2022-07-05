import { FiEdit, FiArchive } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function Note({ isArchived, note, title, createdAt, id }) {
  const navigate = useNavigate();
  const [archive, setArchive] = useState(false);

  const [currNote, setCurrNote] = useState({});
  useEffect(() => {
    async function getCurrNote(id) {
      const req = await fetch("http://localhost:5000/notes/" + id);
      const res = await req.json();
      setCurrNote(res);
    }
    getCurrNote(id);
  }, [id]);

  const wordSlice = (word) => {
    if (word?.length < 70) {
      return word;
    }
    return `${word?.slice(0, 100)}........`;
  };
  async function archiveHandler() {
    setArchive(true);

    const req = await fetch("http://localhost:5000/notes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...currNote, isArchived: !isArchived }),
    });

    setTimeout(() => {
      setArchive(false);
    }, 1000);
  }
  return (
    <div className="h-[230px] bg-black/80 p-5 rounded-xl shadow-xl flex flex-col justify-between">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/note/${id}`);
        }}
      >
        <h1 className="text-white font-semibold">{title}</h1>
        <p className="text-sm text-white/80">{wordSlice(note)}</p>
      </div>
      <div className="flex relative items-center justify-between">
        <p className="text-sm text-gray-100">{createdAt}</p>
        <div className=" flex z-50 items-center space-x-5 text-xl text-white">
          <FiArchive
            onClick={archiveHandler}
            className={`cursor-pointer group `}
          />
          <div
            className={`absolute text-sm -top-10 right-0 bg-white/20 p-1 rounded group-hover:block ${
              archive ? "" : "hidden"
            }`}
          >
            {isArchived
              ? "success removed from archived"
              : "success added to archived"}
          </div>
          <FiEdit
            className="cursor-pointer"
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
