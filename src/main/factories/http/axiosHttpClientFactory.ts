import { AxiosHttpClient } from "@/infra/axiosHttpClient/AxiosHttpClient";

export const makeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
