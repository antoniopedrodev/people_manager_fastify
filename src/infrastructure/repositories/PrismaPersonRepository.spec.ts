import { PrismaPersonRepository } from './PrismaPersonRepository';
import { Person } from '../../domain/entities/Person';
import { getMockPrismaClient } from '../../test/setup';

describe('PrismaPersonRepository', () => {
  let repository: PrismaPersonRepository;
  const mockPrisma = getMockPrismaClient();

  beforeEach(() => {
    repository = new PrismaPersonRepository(mockPrisma as any);
    jest.clearAllMocks();
  });

  const mockPersonData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: new Date('1990-01-01'),
    cpf: '12345678901',
    city: 'New York',
    state: 'NY',
    telephone: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  describe('create', () => {
    it('should create a person successfully', async () => {
      mockPrisma.person.create.mockResolvedValue(mockPersonData);

      const person = new Person(
        null,
        mockPersonData.name,
        mockPersonData.email,
        mockPersonData.dateOfBirth,
        mockPersonData.cpf,
        mockPersonData.city,
        mockPersonData.state,
        mockPersonData.telephone
      );

      const result = await repository.create(person);

      expect(result).toBeInstanceOf(Person);
      expect(result.name).toBe(mockPersonData.name);
      expect(mockPrisma.person.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all people', async () => {
      const mockPeople = [mockPersonData, { ...mockPersonData, id: 2, name: 'Jane Doe' }];
      mockPrisma.person.findMany.mockResolvedValue(mockPeople);

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Person);
      expect(result[1]).toBeInstanceOf(Person);
      expect(result[0].name).toBe('John Doe');
      expect(result[1].name).toBe('Jane Doe');
      expect(mockPrisma.person.findMany).toHaveBeenCalled();
    });

    it('should return empty array when no people exist', async () => {
      mockPrisma.person.findMany.mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toHaveLength(0);
      expect(mockPrisma.person.findMany).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a person when found', async () => {
      mockPrisma.person.findUnique.mockResolvedValue(mockPersonData);

      const result = await repository.findById(1);

      expect(result).toBeInstanceOf(Person);
      expect(result?.name).toBe(mockPersonData.name);
      expect(mockPrisma.person.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('should return null when person not found', async () => {
      mockPrisma.person.findUnique.mockResolvedValue(null);

      const result = await repository.findById(999);

      expect(result).toBeNull();
      expect(mockPrisma.person.findUnique).toHaveBeenCalledWith({
        where: { id: 999 }
      });
    });
  });

  describe('update', () => {
    it('should update a person successfully', async () => {
      const updatedData = {
        ...mockPersonData,
        name: 'John Updated',
        email: 'john.updated@example.com'
      };
      mockPrisma.person.update.mockResolvedValue(updatedData);

      const updatePerson = new Person(
        1,
        updatedData.name,
        updatedData.email,
        updatedData.dateOfBirth,
        updatedData.cpf,
        updatedData.city,
        updatedData.state,
        updatedData.telephone
      );

      const result = await repository.update(1, updatePerson);

      expect(result).toBeInstanceOf(Person);
      expect(result.name).toBe(updatedData.name);
      expect(result.email).toBe(updatedData.email);
      expect(mockPrisma.person.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          name: updatedData.name,
          email: updatedData.email,
          dateOfBirth: updatedData.dateOfBirth,
          cpf: updatedData.cpf,
          city: updatedData.city,
          state: updatedData.state,
          telephone: updatedData.telephone,
        }
      });
    });

    it('should throw error when updating non-existent person', async () => {
      mockPrisma.person.update.mockRejectedValue(new Error('Record not found'));

      const updatePerson = new Person(
        999,
        mockPersonData.name,
        mockPersonData.email,
        mockPersonData.dateOfBirth,
        mockPersonData.cpf,
        mockPersonData.city,
        mockPersonData.state,
        mockPersonData.telephone
      );

      await expect(repository.update(999, updatePerson))
        .rejects
        .toThrow('Record not found');
    });
  });

  describe('delete', () => {
    it('should delete a person successfully', async () => {
      mockPrisma.person.delete.mockResolvedValue(mockPersonData);

      await repository.delete(1);

      expect(mockPrisma.person.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });

    it('should throw error when deleting non-existent person', async () => {
      mockPrisma.person.delete.mockRejectedValue(new Error('Record not found'));

      await expect(repository.delete(999))
        .rejects
        .toThrow('Record not found');
    });
  });
});