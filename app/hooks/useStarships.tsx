import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

export interface Starships {
  name: string;
  passengers: string;
  pilots: string;
  url: string;
}

const apiClient = new APIClient<Starships>("/starships");

const useStarships = () =>
  useQuery({
    queryKey: ["Starships"],
    queryFn: () => apiClient.getAll,
  });

export default useStarships;
