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
  let ready_for_sum = false;

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

        setPilots(updatedPilots);
        ready_for_sum = true;
      }
    }
  }, [characters]);

  return (
    <div>
      <h1>Pilots</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Starships</th>
            <th>total passenger capacity</th>
          </tr>
        </thead>
        <tbody>
          {pilots.map((pilot) => (
            <tr key={pilot.name}>
              <td>{pilot.name}</td>
              {pilot.starships}
              <td>
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
    </div>
  );
};

export default listOfPilots;

// if (pilots) {
//   pilots.map(
//     (pilot) =>
//       pilot.starships.map((ship) => {
//         const match = list_starships?.find((s) => s.url == ship);
//         ship = match!.name;
//       }),
//     console.log("ships: " + pilots.map((s) => s.starships))
//   );
// }

// const updatedPilots = pilots.map((pilot) => ({
//   ...pilot,
//   starships: pilot.starships.map((ship) => {
//     const match = list_starships?.find((s) => s.url === ship);
//     return match ? match.name : "nope";
//   }),
// }));

// let value: string[] = [];
// for (let i = 0; i < list_starships.length; i++) {
//   value = pilots[i].starships;
//   for (let j = 0; j < value.length; j++) {
//     const name_of_starship = list_starships.find(
//       (s) => s.url === value[j]
//     );
//     console.log("name of starship " + value[j]);

//     value[j] = name_of_starship!.name;
//   }
// }

// const updatedPilots = pilots.map((pilot) => ({
//   ...pilot,
//   starships: value,
// }));
// setPilots(updatedPilots);
