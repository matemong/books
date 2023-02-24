interface BookData{
    title: string
    cover_i: number
}

export function Book({title, cover_i}: BookData) {
  return (
    <div className="flex h-52 pt-4">
      <img
        alt={`${title} cover`}
        className="object-contain h-100 w-52"
        src={
          cover_i
            ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
            : "TODO: placeholder"
        }
      ></img>
      <h2 className="p-5 text-left text-3xl font-bold text-jet">{title}</h2>
    </div>
  );
}
