"use client"
import { useQueries } from "@tanstack/react-query";
import APIClient from "../services/api-client";

interface Films {
    title: string
}


const apiClient = new APIClient<Films>("/films")


const useFilms = (films: string[]) =>{
   
    
    
    
     return useQueries({
        queries: films.map((id) => ({
            queryKey: ["Films", id],
            queryFn: () => apiClient.get(id),
            enable: films.length,
            staletime: 1000 * 60 * 5, // Cache for 5 minutes
            
            
         
        })),
        combine: (results) => {
            return {
                data: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            }
        }
       
    })
   
}

export default useFilms