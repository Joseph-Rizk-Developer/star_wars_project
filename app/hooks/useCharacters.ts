"use client"
import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import Error from "next/error";


export interface Character {
  name: string,
  birth_year: string,
  gender: string,
  height: string,
  mass: string,
  homeworld: string,
  films: string[]
}


const apiClient = new APIClient<Character>("/people/")

const useCharacters = (pageParam: number) => {
    return useQuery<FetchResponse<Character>, Error>({
      queryKey: ["characters", pageParam],
      queryFn: () =>apiClient.getAll({ params: { page: pageParam } }),
      
    });
};

    
export default useCharacters