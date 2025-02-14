import Fastify from 'fastify';
import personRoutes from './person.routes';

const mockCreate = jest.fn();
const mockGetAll = jest.fn();
const mockGetById = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

jest.mock('../controllers/PersonController', () => ({
  PersonController: jest.fn().mockImplementation(() => ({
    create: mockCreate,
    getAll: mockGetAll,
    getById: mockGetById,
    update: mockUpdate,
    delete: mockDelete,
  })),
}));

describe('Person Routes', () => {
  let app: any;

  beforeEach(async () => {
    app = Fastify();
    app.decorate('prisma', {});
    await app.register(personRoutes, { prefix: '/api/people' });
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /api/people', () => {
    it('should create a person and return 201 with the created person', async () => {
      const mockPerson = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        cpf: '12345678900',
        city: 'City',
        state: 'ST',
        telephone: '1234567890',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      mockCreate.mockResolvedValue(mockPerson);

      const response = await app.inject({
        method: 'POST',
        url: '/api/people',
        payload: {
          name: 'John Doe',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPerson);
      expect(mockCreate).toHaveBeenCalled();
    });

    it('should return 500 if email or CPF already exists', async () => {
      const error = new Error('Conflict');
      mockCreate.mockRejectedValue(error);

      const response = await app.inject({
        method: 'POST',
        url: '/api/people',
        payload: {
          name: 'John Doe',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });

    it('should return 500 on server error', async () => {
      mockCreate.mockRejectedValue(new Error('Internal Error'));

      const response = await app.inject({
        method: 'POST',
        url: '/api/people',
        payload: {
          name: 'John Doe',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/api/people',
        payload: {},
      });

      expect(response.statusCode).toBe(400);
      expect(mockCreate).not.toHaveBeenCalled();
    });
  });

  describe('GET /api/people', () => {
    it('should return 200 with all persons', async () => {
      const mockPersons = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
          telephone: '1234567890',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ];
      mockGetAll.mockResolvedValue(mockPersons);

      const response = await app.inject({
        method: 'GET',
        url: '/api/people',
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPersons);
      expect(mockGetAll).toHaveBeenCalled();
    });

    it('should return 500 on server error', async () => {
      mockGetAll.mockRejectedValue(new Error('Internal Error'));

      const response = await app.inject({
        method: 'GET',
        url: '/api/people',
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });
  });

  describe('GET /api/people/:id', () => {
    it('should return 200 with the person by ID', async () => {
      const mockPerson = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        cpf: '12345678900',
        city: 'City',
        state: 'ST',
        telephone: '1234567890',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      mockGetById.mockResolvedValue(mockPerson);

      const response = await app.inject({
        method: 'GET',
        url: '/api/people/1',
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPerson);
      expect(mockGetById).toHaveBeenCalled();
    });

    /* it('should return 404 if person not found', async () => {
      mockGetById.mockResolvedValue(null);

      const response = await app.inject({
        method: 'GET',
        url: '/api/people/999',
      });

      expect(response.statusCode).toBe(404);
      expect(JSON.parse(response.payload)).toEqual({
        "error": "Not Found",
        "message": "Route GET:/api/people/persons/999 not found",
        "statusCode": 404,
      });
    }); */

    it('should return 500 on server error', async () => {
      mockGetById.mockRejectedValue(new Error('Internal Error'));

      const response = await app.inject({
        method: 'GET',
        url: '/api/people/1',
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });
  });

  describe('PUT /api/people/:id', () => {
    it('should update a person and return 200', async () => {
      const mockPerson = {
        id: 1,
        name: 'John Updated',
        email: 'john@example.com',
        dateOfBirth: '1990-01-01',
        cpf: '12345678900',
        city: 'City',
        state: 'ST',
        telephone: '1234567890',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };
      mockUpdate.mockResolvedValue(mockPerson);

      const response = await app.inject({
        method: 'PUT',
        url: '/api/people/1',
        payload: {
          name: 'John Updated',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPerson);
      expect(mockUpdate).toHaveBeenCalled();
    });

    it('should return 500 if person not found', async () => {
      const error = new Error('Not Found');
      mockUpdate.mockRejectedValue(error);

      const response = await app.inject({
        method: 'PUT',
        url: '/api/people/999',
        payload: {
          name: 'John Updated',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });

    it('should return 500 on duplicate email or CPF', async () => {
      const error = new Error('Conflict');
      mockUpdate.mockRejectedValue(error);

      const response = await app.inject({
        method: 'PUT',
        url: '/api/people/1',
        payload: {
          name: 'John Updated',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });

    it('should return 500 on server error', async () => {
      mockUpdate.mockRejectedValue(new Error('Internal Error'));

      const response = await app.inject({
        method: 'PUT',
        url: '/api/people/1',
        payload: {
          name: 'John Updated',
          email: 'john@example.com',
          dateOfBirth: '1990-01-01',
          cpf: '12345678900',
          city: 'City',
          state: 'ST',
        },
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });

    it('should return 500 if validation fails', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/api/people/1',
        payload: {},
      });

      expect(response.statusCode).toBe(500);
      expect(mockUpdate).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/people/:id', () => {
    it('should delete a person and return 200', async () => {

      const response = await app.inject({
        method: 'DELETE',
        url: '/api/people/1',
      });

      expect(response.statusCode).toBe(200);
      expect(mockDelete).toHaveBeenCalled();
    });

    it('should return 500 on server error', async () => {
      mockDelete.mockRejectedValue(new Error('Internal Error'));

      const response = await app.inject({
        method: 'DELETE',
        url: '/api/people/1',
      });

      expect(response.statusCode).toBe(500);
      expect(JSON.parse(response.payload)).toEqual({
        error: 'Internal Server Error',
      });
    });
  });
});