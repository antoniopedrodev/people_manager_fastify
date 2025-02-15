import { DeletePersonUseCase } from './DeletePersonUseCase';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

describe('DeletePersonUseCase', () => {
  let deletePersonUseCase: DeletePersonUseCase;
  let mockPersonRepository: jest.Mocked<IPersonRepository>;

  beforeEach(() => {
      mockPersonRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      };
  
      deletePersonUseCase = new DeletePersonUseCase(mockPersonRepository);
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should successfully delete a person when valid ID is provided', async () => {
      const personId = 1;
      mockPersonRepository.delete.mockResolvedValue();

      const result = await deletePersonUseCase.execute(personId);

      expect(mockPersonRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockPersonRepository.delete).toHaveBeenCalledWith(personId);
    });

    it('should propagate errors from the repository', async () => {
      const personId = 1;
      const error = new Error('Database connection failed');
      mockPersonRepository.delete.mockRejectedValue(error);

      await expect(deletePersonUseCase.execute(personId)).rejects.toThrow(error);
      expect(mockPersonRepository.delete).toHaveBeenCalledTimes(1);
      expect(mockPersonRepository.delete).toHaveBeenCalledWith(personId);
    });
  });
});