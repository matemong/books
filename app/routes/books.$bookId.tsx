import { useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { addBookToFavourites } from "~/utils/books.server";

import { requireUserId } from "~/utils/auth.server";
import { Layout } from "~/components/layout";

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const { bookId } = params;
  const userId = await requireUserId(request);

  const bookData = await (
    await addBookToFavourites(userId, bookId!)
  );
  console.log(bookData);
  return bookData;

}
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const { bookId } = params;

  const bookData = await (
    await fetch(`https://openlibrary.org/works/${bookId}.json`)
  ).json();

  return json({ bookData });
};

export default function BookDetailsPage() {
  const { bookData } = useLoaderData();
  return (
    
    
    <Layout>
            {/* {bookData.covers === undefined ? (
              ""
            ) : (
              <div className="carousel w-full">
                {bookData.covers.map((cover: string, index: number) => {
                  return (
                    <div
                      key={cover}
                      id={`slide${index + 1}`}
                      className="carousel-item relative w-full"
                    >
                      <img
                        src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                        className="h-full"
                        alt={`cover of the book titled ${bookData.title}`}
                        title={`cover of the book titled ${bookData.title}`}
                      />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                          href={`#slide${bookData.covers.length}`}
                          className="btn btn-circle"
                        >
                          ❮
                        </a>
                        <a
                          href={`#slide${index + 2}`}
                          className="btn btn-circle"
                        >
                          ❯
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )} */}
      <div className="card">
        <div className="card-body">
          <h1 className="px-5 pb-5 text-left text-2xl font-bold text-jet">
            {bookData?.title}
          </h1>
          <p className="font-semibold text-jet">{bookData?.description} </p>
          <Form method="post">
            <button
              name="_action"
              value="favourite"
              type="submit"
              className="absolute top-8 right-8 btn btn-primary transition duration-300 ease-in-out hover:-translate-y-1"
            >
              add to favourites
          </button>
        </Form>
        </div>
      </div>
    </Layout>
   
  );
}
