export abstract class JwtServiceContract {
  abstract sign(payload: any): string;
  abstract verify(token: string): any;
}
