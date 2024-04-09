import { CryptServiceContract } from '@shared/abstractions/crypt-service';
import * as argon from 'argon2';

export class Argon2CryptService extends CryptServiceContract {
  async verify(digest: string, password: string | Buffer) {
    return argon.verify(digest, password);
  }
}
