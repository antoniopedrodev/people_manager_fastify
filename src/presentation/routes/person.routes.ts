import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PersonController } from '../controllers/PersonController';
import { PrismaPersonRepository } from '../../infrastructure/repositories/PrismaPersonRepository';
import { CreatePersonUseCase } from '../../application/use-cases/CreatePersonUseCase';
import { GetAllPersonsUseCase } from '../../application/use-cases/GetAllPersonsUseCase';
import { GetPersonByIdUseCase } from '../../application/use-cases/GetPersonByIdUseCase';
import { UpdatePersonUseCase } from '../../application/use-cases/UpdatePersonUseCase';
import { DeletePersonUseCase } from '../../application/use-cases/DeletePersonUseCase';
import { CreatePersonDTO, UpdatePersonDTO } from '../../application/dtos/PersonDTO';
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default async function personRoutes(fastify: FastifyInstance) {
  const repository = new PrismaPersonRepository(fastify.prisma);
  
  const controller = new PersonController(
    new CreatePersonUseCase(repository),
    new GetAllPersonsUseCase(repository),
    new GetPersonByIdUseCase(repository),
    new UpdatePersonUseCase(repository),
    new DeletePersonUseCase(repository)
  );

  const personSchema = {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      dateOfBirth: { type: 'string', format: 'date' },
      cpf: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      address: { type: 'string' },
      telephone: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  };

  const createPersonSchema = {
    type: 'object',
    required: ['name', 'email', 'dateOfBirth', 'cpf'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      dateOfBirth: { type: 'string', format: 'date' },
      cpf: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      address: { type: 'string' },
      telephone: { type: 'string', nullable: true },
    },
  };

  const updatePersonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      dateOfBirth: { type: 'string', format: 'date' },
      cpf: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      address: { type: 'string' },
      telephone: { type: 'string', nullable: true },
    },
  };

  fastify.post<{
    Body: CreatePersonDTO
  }>('/', {
    schema: {
      summary: 'Create a new person',
      tags: ['People'],
      body: createPersonSchema,
      response: {
        201: personSchema,
        400: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Body: CreatePersonDTO
      }>,
      reply: FastifyReply
    ) => {
      return controller.create(request, reply);
    }
  });

  fastify.get('/', {
    schema: {
      summary: 'Get all people',
      tags: ['People'],
      response: {
        200: {
          type: 'array',
          items: personSchema,
        },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      return controller.getAll(request, reply);
    }
  });

  fastify.get<{
    Params: { id: string }
  }>('/:id', {
    schema: {
      summary: 'Get a person by ID',
      tags: ['People'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Person ID' },
        },
      },
      response: {
        200: personSchema,
        404: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: { id: string }
      }>,
      reply: FastifyReply
    ) => {
      return controller.getById(request, reply);
    }
  });

  fastify.put<{
    Params: { id: string };
    Body: UpdatePersonDTO
  }>('/:id', {
    schema: {
      summary: 'Update a person by ID',
      tags: ['People'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Person ID' },
        },
      },
      body: updatePersonSchema,
      response: {
        200: personSchema,
        400: { type: 'object', properties: { error: { type: 'string' } } },
        404: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: UpdatePersonDTO
      }>,
      reply: FastifyReply
    ) => {
      return controller.update(request, reply);
    }
  });

  fastify.delete<{
    Params: { id: string }
  }>('/:id', {
    schema: {
      summary: 'Delete a person by ID',
      tags: ['People'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Person ID' },
        },
      },
      response: {
        204: { type: 'null', description: 'No Content' },
        404: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: { id: string }
      }>,
      reply: FastifyReply
    ) => {
      return controller.delete(request, reply);
    }
  });
}