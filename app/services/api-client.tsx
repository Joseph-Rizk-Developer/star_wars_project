import axios, { AxiosRequestConfig } from "axios";

export interface CharacterResult<T> {
  fields: T;
}
export interface FetchResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: CharacterResult<T>[];
}

const axiosInstance = axios.create({
  baseURL: "https://swapi-node.now.sh/api",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
  get = (id: string) => {
    return axiosInstance
      .get<CharacterResult<T>>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
  search = (name: string) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint + `/?search=${name}`)
      .then((res) => res.data);
  };

  getEverything = async (initalConfig: AxiosRequestConfig) => {
    let total = [];
    let endpoint = this.endpoint;
    let config = initalConfig;

    let next: string | undefined | null;

    do {
      const response = axiosInstance
        .get<FetchResponse<T>>(endpoint, config)
        .then((res) => res.data);
      const data = (await response).results;
      total.push(...data);
      next = (await response).next;

      if (next) {
        endpoint = "https://swapi-node.now.sh" + next;
      }
    } while (next);

    return total;
  };
}
export default APIClient;
