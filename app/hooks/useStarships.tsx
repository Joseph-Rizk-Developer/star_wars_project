import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

export interface Starships {
  name: string;
  passengers: string;
  pilots: string;
  url: string;
}

const apiClient = new APIClient<Starships>("/starships");

const useStarships = (pageParam: number) =>
  useQuery({
    queryKey: ["Starships", pageParam],
    queryFn: () => apiClient.getAll({ params: { page: pageParam } }),
  });

export default useStarships;
