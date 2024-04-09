export abstract class SignInUseCaseInterface {
  abstract execute(cpf: string, password: string): Promise<any | null>;
}
