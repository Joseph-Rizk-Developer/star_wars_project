"use client"
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Character } from "./useCharacters";



const apiClient = new APIClient<Character>("/people")
const useCharacter = (characterid: string) =>
  useQuery({
    queryKey: ["character", characterid],
    queryFn:  () => apiClient.get(characterid),
   
  });

  
export default useCharacter