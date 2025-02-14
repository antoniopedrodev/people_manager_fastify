import { Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

export class GetPersonByIdUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(id: number): Promise<Person | null> {
    return this.personRepository.findById(id);
  }
}
