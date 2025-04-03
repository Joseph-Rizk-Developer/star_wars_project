"use client"
import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import Error from "next/error";


interface Character {
    name: string,
    birth_year: string,
    gender: string
}



const apiClient = new APIClient<Character>("/people/")

const useCharacters = (pageParam: number) => {
    return useQuery<FetchResponse<Character>, Error>({
      queryKey: ["characters", pageParam],
      queryFn: () =>apiClient.getAll({ params: { page: pageParam } }),
      
    });
};

    
export default useCharacters