import { BsPlusCircle, BsArchive } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-[200px] min-h-screen border-r bg-gray-200">
      <div className="p-5 ">
        <h1 className="font-bold text-3xl">
          <Link to="/">Notes.</Link>
        </h1>
        <ul className="mt-10 space-y-3">
          <Link to={"/create"} className="flex items-center">
            <BsPlusCircle className="mr-2 text-xl" /> Create Note
          </Link>
          <Link to={"/archived"} className="flex items-center">
            <BsArchive className="mr-2 text-xl" />
            Archived
          </Link>
        </ul>
      </div>
    </nav>
  );
}
