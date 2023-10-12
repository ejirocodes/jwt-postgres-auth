import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt);
  }
  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
