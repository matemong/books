import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    console.log(Object.fromEntries(await request.formData()))
    return null;
}

export default function Home() {
    return (
      <Form method="post" className="w-full px-6 flex items-center gap-x-4 border-b-4 border-purple h-20 justify-center">
        <div className={`flex items-center w-2/5`}>
          <input
            type="text"
            name="title"
            className="w-full rounded-xl px-3 py-2 border-purple border-opacity-50"
            placeholder="Search book title"
          />
          <svg
            className="w-4 h-4 fill-current text-gray-400 -ml-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
        
        <button
          type="submit"
          name="_action"
          className="rounded-xl bg-purple text-white font-semibold px-3 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-darkPurple"
        >
          Search
        </button>
        
      </Form>
    );
  }
  