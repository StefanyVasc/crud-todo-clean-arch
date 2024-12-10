import { APP_BASE_URL } from "@/main/routes/infra";

export const makeApplicationBaseUrl = (path: string): string => {
  return `${APP_BASE_URL}${path}`;
};
