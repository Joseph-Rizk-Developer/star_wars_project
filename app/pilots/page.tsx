"use client";
import React, { useEffect, useState } from "react";
import useCharacters, { Character } from "../hooks/useCharacters";
import useStarships, { Starships } from "../hooks/useStarships";
import { CharacterResult, FetchResponse } from "../services/api-client";

const listOfPilots = () => {
  // get the list of characters
  // go through the whole list and take each charcter who pilots 1 or more starships and place them in another list called pilots
  // get the list of ships
  // take each pilot and his list of starships. compare each of his starships against the entire list of starships and for each matching url, take the number of passengers from the corresponding starship in the starship list and add it to the total passenger capacity in the pilot's object
  // take each pilot and his list of starships. compare each of his starships against the entire list of starships and for each matching url, take the pilots starship name and replace it with the name of the corresponding starship in the starships list
  // compare each pilot against each other to determine who the top five passenger capacities are.
  // display data

  const { data: characters } = useCharacters();
  const { data: starships } = useStarships();
  // const [pilots, setPilots] = useState<CharacterResult<Character>[]>();
  const [amendComplete, setAmend] = useState(false);
  const top_5_pilots = (pilots: Character[]) => {
    const new_list = pilots
      .sort(
        (a, b) =>
          b.passenger_capacity.reduce((total, num) => total + num, 0) -
          a.passenger_capacity.reduce((total, num) => total + num, 0)
      )
      .slice(0, 5);
    return new_list;
  };

  let pilots = characters?.filter((c) => c.fields.starships.length >= 1);

  pilots = pilots?.map((p) => ({
    ...p,
    fields: {
      ...p.fields,
      starships: p.fields.starships.map((s) => {
        const match = starships?.find((star) => star.fields.url === s);
        return match ? match.fields.starship_class : "no match";
      }),
    },
  }));

  console.log("updated list: " + pilots?.map((p) => p.fields.starships));

  return (
    <div
      style={{
        width: "100%",
        height: "100",
        paddingTop: "10%",
        paddingBottom: "10%",
        justifyItems: "center",
      }}
    >
      <h1 className="text-6xl text-yellow-400 font-extrabold text-center star-wars-style pb-5">
        Pilots
      </h1>
      <table className="table-auto border-collapse border border-gray-400 w-3xl p-x-6">
        <thead>
          <tr className="bg-yellow-400">
            <th>Name</th>
            <th>Starships</th>
          </tr>
        </thead>

        <tbody>
          {pilots?.map((pilot) => (
            <tr
              className="font-bold hover:bg-yellow-400"
              key={pilot.fields.name}
            >
              <td className="border border-gray-400 px-4 py-2">
                {pilot.fields.name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {pilot.fields.starships.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default listOfPilots;
