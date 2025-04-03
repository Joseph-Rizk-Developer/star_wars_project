import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

interface Planet {
    name: string
}


const apiClient = new APIClient<Planet>("/planets")

const usePlanet = (homeworldId: string) => useQuery({

    queryKey: ["Planet", homeworldId],
    queryFn: () => apiClient.get(homeworldId)

})

export default usePlanet