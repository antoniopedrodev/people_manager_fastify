import { GetPersonByIdUseCase } from './GetPersonByIdUseCase';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { Person } from '../../domain/entities/Person';

describe('GetPersonByIdUseCase', () => {
  let personRepository: IPersonRepository;
  let getPersonByIdUseCase: GetPersonByIdUseCase;

  beforeEach(() => {
    personRepository = {
      findById: jest.fn(),
    } as unknown as IPersonRepository; // Type assertion to mock the interface
    getPersonByIdUseCase = new GetPersonByIdUseCase(personRepository);
  });

  test('should return a person when a valid ID is provided', async () => {
    const mockPerson = new Person(1, 'John Doe', 'john@example.com', new Date('1990-01-01'), '12345678901', 'City A', 'State A');

    personRepository.findById = jest.fn().mockResolvedValue(mockPerson);

    const result = await getPersonByIdUseCase.execute(1);

    expect(result).toEqual(mockPerson);
    expect(personRepository.findById).toHaveBeenCalledWith(1);
    expect(personRepository.findById).toHaveBeenCalledTimes(1);
  });

  test('should return null when an invalid ID is provided', async () => {
    personRepository.findById = jest.fn().mockResolvedValue(null);

    const result = await getPersonByIdUseCase.execute(999); // Assuming 999 is an invalid ID

    expect(result).toBeNull();
    expect(personRepository.findById).toHaveBeenCalledWith(999);
    expect(personRepository.findById).toHaveBeenCalledTimes(1);
  });

  test('should handle errors gracefully', async () => {
    const errorMessage = 'Database error';
    personRepository.findById = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(getPersonByIdUseCase.execute(1)).rejects.toThrow(errorMessage);
    expect(personRepository.findById).toHaveBeenCalledWith(1);
    expect(personRepository.findById).toHaveBeenCalledTimes(1);
  });
});