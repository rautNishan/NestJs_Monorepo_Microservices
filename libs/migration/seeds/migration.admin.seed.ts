import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';

@Injectable()
export class MigrationAdminSeed {
  constructor() {}
  @Command({
    command: 'seed:admin',
    describe: 'Seed admin user',
  })
  async seed(): Promise<void> {}
}
