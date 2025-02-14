import { GetAllPersonsUseCase } from './GetAllPersonsUseCase';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { Person } from '../../domain/entities/Person';

describe('GetAllPersonsUseCase', () => {
  let personRepository: IPersonRepository;
  let getAllPersonsUseCase: GetAllPersonsUseCase;

  beforeEach(() => {
    personRepository = {
      findAll: jest.fn(),
    } as unknown as IPersonRepository;
    getAllPersonsUseCase = new GetAllPersonsUseCase(personRepository);
  });

  test('should return a list of persons', async () => {
    const mockPersons = [
      new Person(1, 'John Doe', 'john@example.com', new Date('1990-01-01'), '12345678901', 'City A', 'State A'),
      new Person(2, 'Jane Doe', 'jane@example.com', new Date('1995-02-02'), '12345678902', 'City B', 'State B'),
    ];

    personRepository.findAll = jest.fn().mockResolvedValue(mockPersons);

    const result = await getAllPersonsUseCase.execute();

    expect(result).toEqual(mockPersons);
    expect(personRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array when no persons exist', async () => {
    personRepository.findAll = jest.fn().mockResolvedValue([]);

    const result = await getAllPersonsUseCase.execute();

    expect(result).toEqual([]);
    expect(personRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('should handle errors gracefully', async () => {
    const errorMessage = 'Database error';
    personRepository.findAll = jest.fn().mockRejectedValue(new Error(errorMessage));

    await expect(getAllPersonsUseCase.execute()).rejects.toThrow(errorMessage);
    expect(personRepository.findAll).toHaveBeenCalledTimes(1);
  });
});