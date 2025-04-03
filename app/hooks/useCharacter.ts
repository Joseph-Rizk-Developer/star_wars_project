"use client"
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Character } from "./useCharaters";



const apiClient = new APIClient<Character>("/people/82")
const useCharacter = () =>
  useQuery<Character>({
    queryKey: ["character"],
    queryFn:  apiClient.get,
   
  });
export default useCharacter