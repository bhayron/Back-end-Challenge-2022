import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloChallenge(): string {
    return 'Back-end Challenge 2022 🏅 - Space Flight News';
  }
}
