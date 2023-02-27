import { Link } from "@remix-run/react";
import placeholder from "~/img/placeholder_cover.png";

interface BookData {
  title: string;
  cover_i: number;
  id: string;
}

export function Book({ title, cover_i, id }: BookData) {
  return (
    <div className="flex h-52 mt-4 w-3/4">
      <img
        alt={`cover of the book titled ${title}`}
        title={`cover of the book titled ${title}`}
        className="object-contain h-100 w-1/6"
        src={
          cover_i
            ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
            : `${placeholder}`
        }
      ></img>
      <div className="w-5/6 bg-white p-2 rounded-xl my-2">
        <h2 className="px-5 pb-5 text-left text-2xl font-bold text-jet">
          {title}
        </h2>
        <Link
        
          to={`../books/${id.split("/").pop()}`}
          className="rounded-xl bg-purple text-white font-semibold px-3 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-darkPurple"
        >details</Link>
      </div>
    </div>
  );
}
