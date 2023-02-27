import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import { requireUserId } from "~/utils/auth.server";
import { Layout } from "~/components/layout";

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
      <h1 className="px-5 pb-5 text-left text-2xl font-bold text-jet">{bookData?.title}</h1>
      <p className="font-semibold text-jet">{bookData?.description} </p>
    </Layout>
  );
}
