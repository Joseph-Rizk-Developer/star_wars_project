"use client";
import React, { useEffect, useState } from "react";
import useCharacters, { Character } from "../hooks/useCharacters";
import useStarships, { Starships } from "../hooks/useStarships";
import { FetchResponse } from "../services/api-client";

const listOfPilots = () => {
  //get the list of characters
  //go through each page and take the characters that are pilots and place them in a list
  const [page, setPage] = useState(1);
  const [starship_page, set_starship_page] = useState(1);
  const [pilots, setPilots] = useState<Character[]>([]);
  const { data: characters } = useCharacters(page);
  const { data: starships } = useStarships(starship_page);
  const [list_starships, setList_starships] = useState<Starships[]>([]);
  const [topFive, setTopFive] = useState<Character[]>([]);
  const [readyForSum, setReadyForSum] = useState(false);

  const top_5_pilots = (pilots: Character[]) => {
    const new_list = pilots
      .slice()
      .sort(
        (a, b) =>
          b.passenger_capacity.reduce((total, num) => total + num, 0) -
          a.passenger_capacity.reduce((total, num) => total + num, 0)
      )
      .slice(0, 5);
    return new_list;
  };
  useEffect(() => {
    if (characters && starships) {
      const list_of_pilots = characters.results.filter(
        (char) => char.starships.length >= 1
      );
      //  console.log("list of pilots: " + list_of_pilots.map((char) => char.name));
      setPilots([...pilots.concat(...list_of_pilots)]);

      if (characters?.count! - page * 10 > 1) {
        if (starship_page <= 4) {
          const list = starships.results;
          if (
            list_starships[list_starships.length - 1] != list[list.length - 1]
          ) {
            setList_starships([...list_starships, ...list]);

            //    console.log("starship page: " + starship_page);
          }
          starship_page != 4 ? set_starship_page(starship_page + 1) : null;
          // console.log(list_starships);
        }
        setPage(page + 1);
      }
      if (characters?.count! - page * 10 < 1) {
        const updatedPilots = pilots.map((pilot) => ({
          ...pilot,
          starships: pilot.starships.map((ship) => {
            const match = list_starships?.find((s) => s.url === ship);
            return match ? match.name : "nope";
          }),
          passenger_capacity: pilot.starships.map((ship) => {
            const match = list_starships?.find((s) => s.url === ship);
            return match
              ? match.passengers == "unknown"
                ? 0
                : parseInt(match.passengers)
              : 0;
          }),
        }));
        setReadyForSum(true);
        setPilots(updatedPilots);
        setTopFive(top_5_pilots(updatedPilots));
      }
    }
  }, [characters]);

  console.log(readyForSum);

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
      <h1 className="text-6xl text-yellow-400 font-extrabold text-center star-wars-style">
        Pilots
      </h1>
      <table className="table-auto border-collapse border border-gray-400 w-3xl p-x-6">
        <thead>
          <tr className="bg-yellow-400">
            <th>Name</th>
            <th>Starships</th>
            <th>total passenger capacity</th>
          </tr>
        </thead>

        <tbody>
          {readyForSum &&
            pilots.map((pilot) => (
              <tr className="font-bold hover:bg-yellow-400" key={pilot.name}>
                <td className="border border-gray-400 px-4 py-2">
                  {pilot.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {pilot.starships.join(", ")}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {pilot.passenger_capacity
                    ? pilot.passenger_capacity.reduce(
                        (total, num) => total + num,
                        0
                      )
                    : 0}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {!readyForSum && <div className="loader"></div>}
      <h1 className="text-6xl text-yellow-400 font-extrabold text-center star-wars-style">
        Top 5 Pilots
      </h1>
      <table className="table-auto border-collapse border border-gray-400 w-3xl p-x-6">
        <thead>
          <tr className="bg-yellow-400">
            <th>Name</th>
            <th>Number of Starships</th>
            <th>Total Passenger Capacity</th>
          </tr>
        </thead>
        <tbody>
          {topFive.map((pilot, index) => (
            <tr key={index} className="font-bold hover:bg-yellow-400">
              <td className="border border-gray-400 px-4 py-2">{pilot.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                {pilot.starships.length}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {pilot.passenger_capacity.reduce((total, num) => total + num)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!readyForSum && <div className="loader"></div>}
    </div>
  );
};

export default listOfPilots;
