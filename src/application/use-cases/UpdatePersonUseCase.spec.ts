import { UpdatePersonUseCase } from './UpdatePersonUseCase';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';
import { Person } from '../../domain/entities/Person';
import { UpdatePersonDTO } from '../dtos/PersonDTO';

describe('UpdatePersonUseCase', () => {
  let updatePersonUseCase: UpdatePersonUseCase;
  let mockPersonRepository: jest.Mocked<IPersonRepository>;

  beforeEach(() => {
    mockPersonRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    updatePersonUseCase = new UpdatePersonUseCase(mockPersonRepository);
  });

  const mockPersonData: UpdatePersonDTO = {
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: new Date('1990-01-01'),
    cpf: '12345678901',
    city: 'New York',
    state: 'NY',
    telephone: '1234567890'
  };

  const mockUpdatedPerson = new Person(
    1,
    mockPersonData.name,
    mockPersonData.email,
    new Date(mockPersonData.dateOfBirth),
    mockPersonData.cpf,
    mockPersonData.city,
    mockPersonData.state,
    mockPersonData.telephone
  );

  describe('execute', () => {
    it('should update a person successfully', async () => {
      // Arrange
      const personId = 1;
      mockPersonRepository.update.mockResolvedValue(mockUpdatedPerson);

      // Act
      const result = await updatePersonUseCase.execute(personId, mockPersonData);

      // Assert
      expect(result).toEqual(mockUpdatedPerson);
      expect(mockPersonRepository.update).toHaveBeenCalledWith(personId, expect.any(Person));
      expect(mockPersonRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should pass correct person data to repository', async () => {
      // Arrange
      const personId = 1;
      mockPersonRepository.update.mockResolvedValue(mockUpdatedPerson);

      // Act
      await updatePersonUseCase.execute(personId, mockPersonData);

      // Assert
      const [calledId, calledPerson] = mockPersonRepository.update.mock.calls[0];
      expect(calledId).toBe(personId);
      expect(calledPerson).toBeInstanceOf(Person);
      expect(calledPerson.name).toBe(mockPersonData.name);
      expect(calledPerson.email).toBe(mockPersonData.email);
      expect(calledPerson.cpf).toBe(mockPersonData.cpf);
      expect(calledPerson.city).toBe(mockPersonData.city);
      expect(calledPerson.state).toBe(mockPersonData.state);
      expect(calledPerson.telephone).toBe(mockPersonData.telephone);
    });

    it('should handle repository errors', async () => {
      // Arrange
      const personId = 1;
      const error = new Error('Repository error');
      mockPersonRepository.update.mockRejectedValue(error);

      // Act & Assert
      await expect(updatePersonUseCase.execute(personId, mockPersonData))
        .rejects
        .toThrow('Repository error');
    });

    it('should handle missing required fields', async () => {
      // Arrange
      const personId = 1;
      const invalidData = {
        ...mockPersonData,
        name: ''  // Name is required
      };

      // Act & Assert
      await expect(updatePersonUseCase.execute(personId, invalidData))
        .rejects
        .toThrow('Name is required');
    });

    it('should create Person with correct ID', async () => {
      // Arrange
      const personId = 1;
      mockPersonRepository.update.mockResolvedValue(mockUpdatedPerson);

      // Act
      await updatePersonUseCase.execute(personId, mockPersonData);

      // Assert
      const [, calledPerson] = mockPersonRepository.update.mock.calls[0];
      expect(calledPerson.id).toBe(personId);
    });

    it('should handle null telephone', async () => {
      // Arrange
      const personId = 1;
      const dataWithoutTelephone = { ...mockPersonData, telephone: undefined };
      const personWithoutTelephone = new Person(
        personId,
        dataWithoutTelephone.name,
        dataWithoutTelephone.email,
        new Date(dataWithoutTelephone.dateOfBirth),
        dataWithoutTelephone.cpf,
        dataWithoutTelephone.city,
        dataWithoutTelephone.state
      );
      mockPersonRepository.update.mockResolvedValue(personWithoutTelephone);

      // Act
      const result = await updatePersonUseCase.execute(personId, dataWithoutTelephone);

      // Assert
      expect(result.telephone).toBeUndefined();
      expect(mockPersonRepository.update).toHaveBeenCalledWith(
        personId,
        expect.objectContaining({
          telephone: undefined
        })
      );
    });
  });
});