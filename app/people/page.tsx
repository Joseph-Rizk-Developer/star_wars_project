"use client";
import React, { useState } from "react";
import useCharacters from "../hooks/useCharacters";
import useCharacter from "../hooks/useCharacter";

const headers = ["Name", "DOB", "Gender"];
const Characters = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useCharacters(page);

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
          {data?.results.map((character) => (
            <tr key={character.name} className="font-bold hover:bg-yellow-400">
              <td className="border border-gray-400 px-4 py-2">
                {character.name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {character.birth_year}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {character.gender}
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
          disabled={data?.count! - page * 10 <= 10 ? true : false}
        >
          {isLoading ? <div className="loader"></div> : "Next page"}
        </button>
      </div>
    </div>
  );
};

export default Characters;
