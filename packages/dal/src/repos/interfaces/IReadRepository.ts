export interface IReadRepository<T> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
}
