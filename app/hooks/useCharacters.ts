"use client"
import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Error from "next/error";


export interface Character {
  name: string,
  birth_year: string,
  gender: string,
  height: string,
  mass: string,
  homeworld: string,
  films: string[],
  starships: string[],
  passenger_capacity: number[],
  url: string
}


const apiClient = new APIClient<Character>("/people/")

const useCharacters = () => {
    return useQuery({
      queryKey: ["characters"],
      queryFn: apiClient.getEverything,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      
    });
};

    
export default useCharacters