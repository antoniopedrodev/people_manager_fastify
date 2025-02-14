import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

export class DeletePersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(id: number): Promise<void> {
    return this.personRepository.delete(id);
  }
}
