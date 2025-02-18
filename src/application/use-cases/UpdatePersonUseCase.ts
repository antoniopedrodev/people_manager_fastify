import { Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { UpdatePersonDTO } from '../dtos/PersonDTO';

export class UpdatePersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async execute(id: number, data: UpdatePersonDTO): Promise<Person> {
    const person = new Person(
      id,
      data.name,
      data.email,
      new Date(data.dateOfBirth),
      data.cpf,
      data.city,
      data.state,
      data.address,
      data.telephone
    );
    
    return this.personRepository.update(id, person);
  }
}
