export class InvalidParametersError extends Error {
  constructor(readonly error: any) {
    super(error);
    this.name = "InvalidParametersError";
  }
}
