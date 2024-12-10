import { faker } from "@faker-js/faker";
import axios from "axios";

export const mockHttpResponse = (): unknown => ({
  data: {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  },
  status: faker.internet.httpStatusCode(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
