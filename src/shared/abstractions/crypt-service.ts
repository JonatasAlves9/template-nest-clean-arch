export abstract class CryptServiceContract {
  abstract verify(digest: string, password: string | Buffer): Promise<boolean>;
  // abstract hash(token: string): any;
}
