import { Person } from '../../domain/entities/Person';

export interface PersonDTO {
  id: number | null,
  name: string,
  email: string,
  dateOfBirth: string,
  cpf: string,
  city: string,
  state: string,
  address?: string,
  telephone?: string,
  createdAt?: string;
  updatedAt?: string;
}

export class PersonMapper {
  static toDTO(person: Person): PersonDTO {
    return {
      id: person.id,
      name: person.name,
      email: person.email,
      dateOfBirth: person.dateOfBirth.toISOString().split('T')[0],
      cpf: person.cpf,
      city: person.city,
      state: person.state,
      address: person.address,
      telephone: person.telephone,
      createdAt: person.createdAt?.toISOString(),
      updatedAt: person.updatedAt?.toISOString()
    };
  }
}