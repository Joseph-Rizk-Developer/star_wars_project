"use client"
import { useQueries } from "@tanstack/react-query";
import APIClient from "../services/api-client";

interface Films {
    title: string
}


const apiClient = new APIClient<Films>("/films")

const filmIds: string[] = []
const useFilms = (films: string[]) =>{
    console.log("use films.length: " + films.length);
    console.log("use filmIds.length: " + filmIds.length);
    while(filmIds.length <= films.length){
        films.forEach(film => {const filmId = film.split("/").filter(Boolean).pop();
        if(filmId){
            filmIds.push(filmId)
        }
    
        });
    }

    console.log("films: " + films);
    console.log("filmIds: " + filmIds);
    
   
    return useQueries({
        queries: filmIds.map((id) => ({
            queryKey: ["Films", id],
            queryFn: () => apiClient.get(id),
            enabled: !!id,
            staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        })),
       
    })
   
}

export default useFilms