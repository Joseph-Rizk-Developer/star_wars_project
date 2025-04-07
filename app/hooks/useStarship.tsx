import { useQueries } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Starships } from "./useStarships";

const apiClient = new APIClient<Starships>("/starship");

const useStarship = (starships: string[]) => {
  return useQueries({
    queries: starships.map((starship) => ({
      queryKey: ["Starships", starship],
      queryFn: () => apiClient.get(starship),
      enable: starships.length,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useStarship;
