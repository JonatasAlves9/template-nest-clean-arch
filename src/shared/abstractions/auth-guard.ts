export abstract class AuthGuardContract {
  abstract canActivate(context: any): Promise<boolean>;
  abstract extractTokenFromHeader(request: any): string | undefined;
}
