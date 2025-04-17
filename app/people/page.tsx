"use client";
import React, { useMemo, useState } from "react";
import useCharacters from "../hooks/useCharacters";
import useCharacter from "../hooks/useCharacter";
import Link from "next/link";
import useCharacterData from "../hooks/useCharacterData";

const headers = ["Name", "DOB", "Gender"];
const Characters = () => {
  const { data, isLoading, error } = useCharacters();
  const [page, setPage] = useState(1);
  const the_data = useMemo(
    () =>
      data?.map(
        (character) => character.fields.url.split("/").pop() as string
      ) ?? [],
    [data]
  );
  const rows_per_page = 10;

  const { data: characters, pending } = useCharacterData(the_data);

  const paginated_data = useMemo(() => {
    const starting_index = (page - 1) * rows_per_page;
    const ending_index = starting_index + rows_per_page;
    return characters?.slice(starting_index, ending_index);
  }, [characters, page]);

  if (error) return { error };
  return (
    <div
      style={{
        width: "100%",
        height: "100",
        paddingTop: "10%",
        justifyItems: "center",
      }}
    >
      <table className="table-auto border-collapse border border-gray-400 w-3xl p-x-6">
        <thead>
          <tr className="bg-yellow-400">
            {headers.map((header) => (
              <th key={header} className="border border-gray-400 px-4 py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated_data?.map((character, index) => (
            <tr key={index} className="font-bold hover:bg-yellow-400">
              <td className="border border-gray-400 px-4 py-2">
                <Link href={`/people/name/${character?.fields.name}`}>
                  {character?.fields.name}
                </Link>
              </td>

              <td className="border border-gray-400 px-4 py-2">
                {character?.fields.birth_year}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {character?.fields.gender}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", paddingTop: 30 }}>
        <button
          className="border border-amber-500 text-yellow-500 hover:bg-yellow-400 hover:text-white font-bold  py-2 px-4 rounded-full mr-7"
          onClick={() => setPage(page - 1)}
          disabled={page == 1 ? true : false}
        >
          Prev Page
        </button>

        <button
          className="border border-amber-500 text-yellow-500 hover:bg-yellow-400 hover:text-white font-bold  py-2 px-4 rounded-full "
          onClick={() => setPage(page + 1)}
          disabled={paginated_data.length < 9 ? true : false}
        >
          {isLoading ? <div className="loader"></div> : "Next page"}
        </button>
      </div>
    </div>
  );
};

export default Characters;
