import { ProblemDetails } from "@/domain/models";

export class ProblemDetailsError extends Error {
  constructor(readonly error: ProblemDetails) {
    super("Houve um erro ao realizar requisição");
    this.error = error;
  }
}
