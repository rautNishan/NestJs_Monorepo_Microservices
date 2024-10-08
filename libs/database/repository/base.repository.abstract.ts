import { Model } from 'mongoose';

export abstract class BaseRepository<Entity> {
  repository: Model<Entity>;
  constructor(repository: Model<Entity>) {
    this.repository = repository;
  }
  // abstract create(data: any);

  async create(data: any) {
    return await this.repository.create(data);
  }
}
