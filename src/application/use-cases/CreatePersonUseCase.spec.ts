import { CreatePersonUseCase } from './CreatePersonUseCase';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { Person } from '../../domain/entities/Person';

describe('CreatePersonUseCase', () => {
  let mockPersonRepository: jest.Mocked<IPersonRepository>;
  let createPersonUseCase: CreatePersonUseCase;

  beforeEach(() => {
    mockPersonRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    createPersonUseCase = new CreatePersonUseCase(mockPersonRepository);
  });

  it('should create a person successfully', async () => {
    const personData = {
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: new Date('1990-01-01'),
      cpf: '12345678901',
      city: 'New York',
      state: 'NY',
      telephone: '1234567890'
    };

    const createdPerson = new Person(
      1,
      personData.name,
      personData.email,
      personData.dateOfBirth,
      personData.cpf,
      personData.city,
      personData.state,
      personData.telephone
    );

    mockPersonRepository.create.mockResolvedValue(createdPerson);

    const result = await createPersonUseCase.execute(personData);

    expect(result).toEqual(createdPerson);
    expect(mockPersonRepository.create).toHaveBeenCalledWith(
      expect.any(Person)
    );
  });

  it('should throw error when repository fails', async () => {
    const personData = {
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: new Date('1990-01-01'),
      cpf: '12345678901',
      city: 'New York',
      state: 'NY',
      telephone: '1234567890'
    };

    mockPersonRepository.create.mockRejectedValue(new Error('Database error'));

    await expect(createPersonUseCase.execute(personData)).rejects.toThrow('Database error');
  });
});