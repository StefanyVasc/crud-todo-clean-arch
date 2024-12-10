import { HttpStatusCode } from "@/data/protocols/http";

export type ProblemDetails = {
  type: string;
  title: string;
  status: HttpStatusCode;
  detail: string;
  instance: string;
  extensions: any;
};
