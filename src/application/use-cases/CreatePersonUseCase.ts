import { Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { CreatePersonDTO } from '../dtos/PersonDTO';

export class CreatePersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(data: CreatePersonDTO): Promise<Person> {
    const person = new Person(
      null,
      data.name,
      data.email,
      new Date(data.dateOfBirth),
      data.cpf,
      data.city,
      data.state,
      data.telephone
    );
    
    return this.personRepository.create(person);
  }
}
