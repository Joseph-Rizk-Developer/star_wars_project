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
  const { data: character, isLoading, isError } = useSearch(name);

  const planetId = character?.results[0].homeworld
    .split("/")
    .filter(Boolean)
    .pop();

  const { data: selectedPlanet } = usePlanet(planetId ?? "");

  const filmIds = useMemo(
    () =>
      character?.results[0].films.map(
        (film) => film.split("/").filter(Boolean).pop() as string
      ) ?? [],
    [character]
  );

  const { data: films, pending } = useFilms(filmIds);

  const filmTitles = !pending ? films.map((film) => film?.title) : [];

  !pending && console.log(films.map((film) => film?.title));

  return (
    <div>
      <h1>{character?.results[0].name}</h1>
      <table>
        <tbody>
          {character_details.map((header) => (
            <tr key={header}>
              <th>{header.toUpperCase()}</th>

              <td>
                {header == "homeworld"
                  ? selectedPlanet?.name
                  : header == "films"
                  ? filmTitles.join(",")
                  : character
                  ? character.results[0][header] || "N/A"
                  : "Loading..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedName;
