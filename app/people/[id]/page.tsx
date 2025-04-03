"use client";
import useCharacter from "@/app/hooks/useCharacter";
import { Character } from "@/app/hooks/useCharacters";
import usePlanet from "@/app/hooks/usePlanet";
import React from "react";

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
  const { data: character, isLoading } = useCharacter(id!);

  const homeworld = character?.homeworld;
  const homeworldId = homeworld?.split("/").filter(Boolean).pop();

  const { data: planet } = usePlanet(homeworldId!);

  if (isLoading) return null;
  return (
    <div>
      <table>
        <tbody>
          {character_details.map((header) => (
            <tr key={header}>
              <th>{header.toUpperCase()}</th>

              <td>
                {header == "homeworld"
                  ? planet?.name
                  : header == "films"
                  ? "Film"
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
