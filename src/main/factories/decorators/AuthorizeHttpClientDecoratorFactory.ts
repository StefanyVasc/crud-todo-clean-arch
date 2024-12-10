import { UserManager } from "oidc-client";

import { HttpClient } from "@/data/protocols/http";
import userManager from "@/infra/auth/user-manager";
import { AuthorizeHttpClientDecorator } from "@/main/decorators";
import { makeAxiosHttpClient } from "@/main/factories/http";

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(
    userManager as UserManager,
    makeAxiosHttpClient()
  );
};

/* 

 padrão Decorator, responsável por adicionar a funcionalidade de autorização 
 (ou algum tipo de cabeçalho de autenticação) a um HttpClient existente, 
 sem modificar diretamente a lógica de comunicação HTTP que ele já realiza.

 */
