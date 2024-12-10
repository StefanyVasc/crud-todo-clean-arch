import { HttpClientSpy } from "@/data/tests/mockHttp";
import { HttpStatusCode } from "@/data/protocols/http";
import { UnauthorizedError, UnexpectedError } from "@/domain/errors";
import { ApiAddTodo } from "./api-add-todo";

const makeSut = () => {
  const httpClientSpy = new HttpClientSpy<ApiAddTodo.Model>();
  const url = "http://localhost:3001/todos";
  const sut = new ApiAddTodo(url, httpClientSpy);

  return { sut, httpClientSpy };
};

describe("RemoteCreateTodo", () => {
  it("should call HttpClient with correct URL, method, and body", async () => {
    const { sut, httpClientSpy } = makeSut();
    const params = { id: 1, title: "Test Todo", completed: false };

    await sut.create(params);

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url: "http://localhost:3001/todos",
      method: "POST",
      body: params,
    });
  });

  it("should throw UnauthorizedError if statusCode is 401", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.unauthorized };

    const promise = sut.create({
      title: "Test Todo",
      completed: false,
      id: 0,
    });

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });

  it("should throw UnexpectedError if statusCode is not 201 or 401", async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = { statusCode: HttpStatusCode.badRequest };

    const promise = sut.create({
      title: "Test Todo",
      completed: false,
      id: 0,
    });

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should return a Todo if statusCode is 201", async () => {
    const { sut, httpClientSpy } = makeSut();
    const todo = {
      result: {
        id: 1,
        title: "Test Todo",
        completed: false,
      },
      statusCode: HttpStatusCode.created,
      success: true,
    };

    httpClientSpy.response = { statusCode: HttpStatusCode.created, body: todo };

    const result = await sut.create({
      title: "Test Todo",
      completed: false,
      id: 0,
    });

    expect(result).toEqual(todo);
  });
});
