import { Person } from '../entities/Person';

export interface IPersonRepository {
  create(person: Person): Promise<Person>;
  findAll(): Promise<Person[]>;
  findById(id: number): Promise<Person | null>;
  update(id: number, person: Person): Promise<Person>;
  delete(id: number): Promise<void>;
}
