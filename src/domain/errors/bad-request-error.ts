export class BadRequestError extends Error {
  type: string | undefined;

  constructor(message?: string, type?: string) {
    super(message ?? 'Algo de errado aconteceu.');
    this.name = 'BadRequestError';
    this.type = type;
  }
}
