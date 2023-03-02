import { Link } from "@remix-run/react";
import placeholder from "~/img/placeholder_cover.png";

interface BookData {
  title: string;
  cover_i: number;
  id: string;
  authors: string[];
}

export function Book({ title, cover_i, id, authors }: BookData) {
  return (
    <div className="flex h-52 mt-4 w-3/4">
      <img
        alt={`cover of the book titled ${title}`}
        title={`cover of the book titled ${title}`}
        className="h-100 w-1/6 max-w-sm rounded-lg shadow-2xl"
        src={
          cover_i
            ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
            : `${placeholder}`
        }
      ></img>
      <div className="w-5/6 p-2 rounded-xl my-2 relative">
        <h1 className="text-3xl font-bold text-jet">{title}</h1>
        {authors &&
        authors.map((author, index) => (
          <h4 key={index}>{author}</h4>
        ))
        }
        
        <Link
          to={`../books/${id.split("/").pop()}`}
          className="btn btn-primary transition duration-300 ease-in-out hover:-translate-y-1 absolute bottom-3 right-3"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
