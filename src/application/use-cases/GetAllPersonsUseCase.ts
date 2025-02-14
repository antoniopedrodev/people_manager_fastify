import { Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

export class GetAllPersonsUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(): Promise<Person[]> {
    return this.personRepository.findAll();
  }
}
