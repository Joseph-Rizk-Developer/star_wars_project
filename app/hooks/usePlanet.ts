import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

interface Planet {
    name: string
}


const apiClient = new APIClient<Planet>("/planets")

const usePlanet = (homeworldId: string) => useQuery({

    queryKey: ["Planet", homeworldId],
    queryFn: () => apiClient.get(homeworldId),
    enabled: !!homeworldId,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
   

})

export default usePlanet