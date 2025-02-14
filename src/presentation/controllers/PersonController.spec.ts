import { PersonController } from './PersonController';
import { CreatePersonUseCase } from '../../application/use-cases/CreatePersonUseCase';
import { GetAllPersonsUseCase } from '../../application/use-cases/GetAllPersonsUseCase';
import { GetPersonByIdUseCase } from '../../application/use-cases/GetPersonByIdUseCase';
import { UpdatePersonUseCase } from '../../application/use-cases/UpdatePersonUseCase';
import { DeletePersonUseCase } from '../../application/use-cases/DeletePersonUseCase';
import { PersonMapper } from '../../application/mappers/PersonMapper';
import { Person } from '../../domain/entities/Person';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePersonDTO, UpdatePersonDTO } from '../../application/dtos/PersonDTO';

describe('PersonController', () => {
  let createPersonUseCase: jest.Mocked<CreatePersonUseCase>;
  let getAllPersonsUseCase: jest.Mocked<GetAllPersonsUseCase>;
  let getPersonByIdUseCase: jest.Mocked<GetPersonByIdUseCase>;
  let updatePersonUseCase: jest.Mocked<UpdatePersonUseCase>;
  let deletePersonUseCase: jest.Mocked<DeletePersonUseCase>;
  let personController: PersonController;

  beforeEach(() => {
    createPersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreatePersonUseCase>;

    getAllPersonsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAllPersonsUseCase>;

    getPersonByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPersonByIdUseCase>;

    updatePersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdatePersonUseCase>;

    deletePersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeletePersonUseCase>;

    personController = new PersonController(
      createPersonUseCase,
      getAllPersonsUseCase,
      getPersonByIdUseCase,
      updatePersonUseCase,
      deletePersonUseCase
    );
  });

  test('create should return a created person', async () => {
    const mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678901',
        city: 'City A',
        state: 'State A',
      },
    } as FastifyRequest<{ Body: CreatePersonDTO }>;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    const mockPerson = new Person(1, 'John Doe', 'john@example.com', new Date('1990-01-01'), '12345678901', 'City A', 'State A');
    
    createPersonUseCase.execute.mockResolvedValue(mockPerson);

    await personController.create(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(201);
    expect(mockReply.send).toHaveBeenCalledWith(PersonMapper.toDTO(mockPerson));
  });

  test('getAll should return all persons', async () => {
    const mockRequest = {} as FastifyRequest;
    
    const mockReply = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    const mockPersons = [
      new Person(1, 'John Doe', 'john@example.com', new Date('1990-01-01'), '12345678901', 'City A', 'State A'),
      new Person(2, 'Jane Doe', 'jane@example.com', new Date('1995-02-02'), '12345678902', 'City B', 'State B'),
    ];

    getAllPersonsUseCase.execute.mockResolvedValue(mockPersons);

    await personController.getAll(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith(mockPersons.map(PersonMapper.toDTO));
  });

  test('getById should return a person by ID', async () => {
    const mockRequest = {
      params: { id: '1' },
    } as FastifyRequest<{ Params: { id: string } }>;
    
    const mockReply = {
      send: jest.fn(),
      code: jest.fn().mockReturnThis(),
    } as unknown as FastifyReply;

    const mockPerson = new Person(1, 'John Doe', 'john@example.com', new Date('1990-01-01'), '12345678901', 'City A', 'State A');

    getPersonByIdUseCase.execute.mockResolvedValue(mockPerson);

    await personController.getById(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith(PersonMapper.toDTO(mockPerson));
  });

  test('getById should return a 404 error if person not found', async () => {
    const mockRequest = {
      params: { id: '999' },
    } as FastifyRequest<{ Params: { id: string } }>;
    
    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    getPersonByIdUseCase.execute.mockResolvedValue(null);

    await personController.getById(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(404);
    expect(mockReply.send).toHaveBeenCalledWith({ error: 'Person not found' });
  });

  test('update should return an updated person', async () => {
    const mockRequest = {
      params: { id: '1' },
      body: {
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678901',
        city: 'City A Updated',
        state: 'State A Updated',
      },
    } as FastifyRequest<{ Params: { id: string }; Body: UpdatePersonDTO }> ;
    
    const mockReply = {
      send: jest.fn(),
    } as unknown as FastifyReply;

    const updatedMockPerson = new Person(1, 'John Doe Updated', 'john.updated@example.com', new Date('1990-01-01'), '12345678901', 'City A Updated', 'State A Updated');

    updatePersonUseCase.execute.mockResolvedValue(updatedMockPerson);

    await personController.update(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalledWith(PersonMapper.toDTO(updatedMockPerson));
  });

  test('delete should return a 204 response on successful deletion', async () => {
    const mockRequest = {
      params: { id: '1' },
    } as FastifyRequest<{ Params: { id: string } }> ;
    
    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    deletePersonUseCase.execute.mockResolvedValue(undefined);

    await personController.delete(mockRequest, mockReply);

    expect(mockReply.code).toHaveBeenCalledWith(204);
  });
});

describe('PersonController Error Handling', () => {
  let createPersonUseCase: jest.Mocked<CreatePersonUseCase>;
  let getAllPersonsUseCase: jest.Mocked<GetAllPersonsUseCase>;
  let getPersonByIdUseCase: jest.Mocked<GetPersonByIdUseCase>;
  let updatePersonUseCase: jest.Mocked<UpdatePersonUseCase>;
  let deletePersonUseCase: jest.Mocked<DeletePersonUseCase>;
  let personController: PersonController;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    createPersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreatePersonUseCase>;

    getAllPersonsUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetAllPersonsUseCase>;

    getPersonByIdUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPersonByIdUseCase>;

    updatePersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<UpdatePersonUseCase>;

    deletePersonUseCase = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<DeletePersonUseCase>;

    personController = new PersonController(
      createPersonUseCase,
      getAllPersonsUseCase,
      getPersonByIdUseCase,
      updatePersonUseCase,
      deletePersonUseCase
    );

    // Mock console.error to prevent actual logging during tests
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockConsoleError.mockRestore();
  });

  describe('create method error handling', () => {
    const mockRequest = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678901',
        city: 'City A',
        state: 'State A',
      },
    } as FastifyRequest<{ Body: CreatePersonDTO }>;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    it('should handle generic server error', async () => {
      createPersonUseCase.execute.mockRejectedValue(new Error('Database error'));

      await personController.create(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });

  describe('getAll method error handling', () => {
    const mockRequest = {} as FastifyRequest;
    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    it('should handle server error', async () => {
      getAllPersonsUseCase.execute.mockRejectedValue(new Error('Database error'));

      await personController.getAll(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });

  describe('getById method error handling', () => {
    const mockRequest = {
      params: { id: '1' },
    } as FastifyRequest<{ Params: { id: string } }>;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    it('should handle server error', async () => {
      getPersonByIdUseCase.execute.mockRejectedValue(new Error('Database error'));

      await personController.getById(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });

  describe('update method error handling', () => {
    const mockRequest = {
      params: { id: '1' },
      body: {
        name: 'John Doe Updated',
        email: 'john.updated@example.com',
        dateOfBirth: new Date('1990-01-01'),
        cpf: '12345678901',
        city: 'City A Updated',
        state: 'State A Updated',
      },
    } as FastifyRequest<{ Params: { id: string }; Body: UpdatePersonDTO }>;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    it('should handle server error', async () => {
      updatePersonUseCase.execute.mockRejectedValue(new Error('Database error'));

      await personController.update(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });

  describe('delete method error handling', () => {
    const mockRequest = {
      params: { id: '1' },
    } as FastifyRequest<{ Params: { id: string } }>;

    const mockReply = {
      code: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    it('should handle server error', async () => {
      deletePersonUseCase.execute.mockRejectedValue(new Error('Database error'));

      await personController.delete(mockRequest, mockReply);

      expect(mockReply.code).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Internal server error' });
      expect(mockConsoleError).toHaveBeenCalled();
    });
  });
});