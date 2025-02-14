import { PersonMapper } from './PersonMapper';
import { Person } from '../../domain/entities/Person';

describe('PersonMapper', () => {
  it('should map Person entity to DTO', () => {
    const person = new Person(
      1,
      'John Doe',
      'john@example.com',
      new Date('1990-01-01'),
      '12345678901',
      'New York',
      'NY',
      '1234567890'
    );

    const dto = PersonMapper.toDTO(person);

    expect(dto).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-01',
      cpf: '12345678901',
      city: 'New York',
      state: 'NY',
      telephone: '1234567890',
      createdAt: person.createdAt?.toISOString(),
      updatedAt: person.updatedAt?.toISOString()
    });
  });
});