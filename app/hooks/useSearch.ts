"use client"
import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Character } from "./useCharacters";



const apiClient = new APIClient<Character>("/people")
const useSearch = (characterName: string) =>
  useQuery({
    queryKey: ["character", characterName],
    queryFn:  () => apiClient.search(characterName),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  
export default useSearch