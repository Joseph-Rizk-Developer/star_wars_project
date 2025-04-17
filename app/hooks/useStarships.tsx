import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

export interface Starships {
  starship_class: string;
  passengers: string;
  pilots: string;
  url: string;
}

const apiClient = new APIClient<Starships>("/starships");

const useStarships = () => {
  return useQuery({
    queryKey: ["Starships"],
    queryFn: apiClient.getEverything,
  });
};

export default useStarships;
