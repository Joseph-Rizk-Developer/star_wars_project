"use client"
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { Character } from "./useCharacters";


const apiClient = new APIClient<Character>("/people")

// const useCharacterData =(characterId: string) => {
//     return useQuery({
//         queryKey: ["CharacterId", characterId],
//         queryFn: () => apiClient.get(characterId),
//         enabled: !!characterId
//     })
// }
const useCharacterData = (characterid: string[]) => {
    
       return useQueries({
            queries: characterid.map((character) => ({
                 queryKey: ["character", character],
                queryFn:  () => apiClient.get(character),
                staleTime: 1000 * 60 * 5, // Cache for 5 minutes},
                enable: characterid.length
            })), combine: (results)=>{
                return {
                    data: results.map((result) => result.data),
                    pending: results.some((result) => result.isPending),
                }
            }
           
              
            });
}
  

  


 

  
export default useCharacterData