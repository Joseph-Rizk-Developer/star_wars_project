"use client";
import useCharacter from "@/app/hooks/useCharacter";
import { Character } from "@/app/hooks/useCharacters";
import useFilms from "@/app/hooks/useFilms";
import usePlanet from "@/app/hooks/usePlanet";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  params: { id: string };
}

const character_details: (keyof Character)[] = [
  "height",
  "mass",
  "homeworld",
  "films",
];

const SelectedCharacter = ({ params: { id } }: Props) => {
  const { data: character, isLoading, isError } = useCharacter(id!);

  const planetId = character?.homeworld?.split("/").filter(Boolean).pop()!;

  const { data: selectedPlanet } = usePlanet(planetId ?? "");

  const films = useFilms(character?.films ?? []);

  const filmTitles = useMemo(() => {
    return films.map((film) => film.data?.title).filter(Boolean);
  }, []);

  return (
    <div>
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
