"use client";
import useCharacter from "@/app/hooks/useCharacter";
import { Character } from "@/app/hooks/useCharacters";
import useFilms from "@/app/hooks/useFilms";
import usePlanet from "@/app/hooks/usePlanet";
import useSearch from "@/app/hooks/useSearch";
import React, { useMemo } from "react";

interface Props {
  params: { id: string };
}

export const character_details: (keyof Character)[] = [
  "height",
  "mass",
  "homeworld",
  "films",
];

const SelectedCharacter = ({ params: { id } }: Props) => {
  console.log("name: " + id);

  const { data: character, isLoading, isError } = useCharacter(id);

  const planetId = character?.homeworld?.split("/").filter(Boolean).pop()!;

  const { data: selectedPlanet } = usePlanet(planetId ?? "");

  const filmIds = useMemo(
    () =>
      character?.films.map(
        (film) => film.split("/").filter(Boolean).pop() as string
      ) ?? [],
    [character]
  );

  const { data: films, pending } = useFilms(filmIds);

  const filmTitles = !pending ? films.map((film) => film?.title) : [];

  !pending && console.log(films.map((film) => film?.title));

  return (
    <div>
      <h1>{character?.name}</h1>
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
                  ? character[header] || "N/A"
                  : "Loading..."}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedCharacter;
