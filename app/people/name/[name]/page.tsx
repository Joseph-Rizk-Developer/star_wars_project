"use client";
import useFilms from "@/app/hooks/useFilms";
import usePlanet from "@/app/hooks/usePlanet";
import useSearch from "@/app/hooks/useSearch";
import React, { useMemo } from "react";
import { character_details } from "../../id/[id]/page";

interface Props {
  params: { name: string };
}

const SelectedName = ({ params: { name } }: Props) => {
  const {
    data: character,
    isLoading: isloadingSearch,
    isError,
  } = useSearch(name);

  console.log("name: " + name);

  const planetId = character?.results[0].fields.homeworld
    .split("/")
    .filter(Boolean)
    .pop();

  const { data: selectedPlanet, isLoading: isloadingPlanet } = usePlanet(
    planetId ?? ""
  );

  const filmIds = useMemo(
    () =>
      character?.results[0].fields.films.map(
        (film) => film.split("/").filter(Boolean).pop() as string
      ) ?? [],
    [character]
  );

  const { data: films, pending } = useFilms(filmIds);

  const filmTitles = !pending ? films.map((film) => film?.fields.title) : [];

  if (isloadingSearch || isloadingPlanet) {
    return (
      <div className="w-full h-[100] pt-[10%] pb-[10%] flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="w-full h-[100] pt-[10%] pb-[10%] justify-items-center">
      <h1 className="text-6xl text-yellow-400 font-extrabold text-center star-wars-style pb-5">
        {character?.results[0].fields.name}
      </h1>
      <table className="table-auto border-collapse border border-gray-400 w-3xl p-x-6">
        <tbody>
          {character_details.map((header) => (
            <tr className="border border-gray-400" key={header}>
              <th className="bg-yellow-400 border-gray-400">
                {header.toUpperCase()}
              </th>

              <td className="border border-gray-400 px-4 py-2">
                {header == "homeworld"
                  ? selectedPlanet?.fields.name
                  : header == "films"
                  ? filmTitles.join(", ")
                  : character
                  ? character.results[0].fields[header] || "N/A"
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedName;
