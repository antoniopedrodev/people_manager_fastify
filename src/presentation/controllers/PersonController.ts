import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePersonUseCase } from '../../application/use-cases/CreatePersonUseCase';
import { GetAllPersonsUseCase } from '../../application/use-cases/GetAllPersonsUseCase';
import { GetPersonByIdUseCase } from '../../application/use-cases/GetPersonByIdUseCase';
import { UpdatePersonUseCase } from '../../application/use-cases/UpdatePersonUseCase';
import { DeletePersonUseCase } from '../../application/use-cases/DeletePersonUseCase';
import { CreatePersonDTO, UpdatePersonDTO } from '../../application/dtos/PersonDTO';
import { PersonMapper } from '../../application/mappers/PersonMapper';

export class PersonController {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private getAllPersonsUseCase: GetAllPersonsUseCase,
    private getPersonByIdUseCase: GetPersonByIdUseCase,
    private updatePersonUseCase: UpdatePersonUseCase,
    private deletePersonUseCase: DeletePersonUseCase
  ) {}

  async create(request: FastifyRequest<{ Body: CreatePersonDTO }>, reply: FastifyReply) {
    try {
      const person = await this.createPersonUseCase.execute(request.body);
      return reply.code(201).send(PersonMapper.toDTO(person));
    } catch (error: any) {
      if (error.code === 'P2002') {
        return reply.code(400).send({ error: 'Email or CPF already exists' });
      }
      console.error('Create person error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const people = await this.getAllPersonsUseCase.execute();
      return reply.send(people.map(PersonMapper.toDTO));
    } catch (error: any) {
      console.error('Get all people error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }

  async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const person = await this.getPersonByIdUseCase.execute(parseInt(request.params.id));
      if (!person) {
        return reply.code(404).send({ error: 'Person not found' });
      }
      return reply.send(PersonMapper.toDTO(person));
    } catch (error: any) {
      console.error('Get person by id error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }

  async update(
    request: FastifyRequest<{ Params: { id: string }; Body: UpdatePersonDTO }>,
    reply: FastifyReply
  ) {
    try {
      const person = await this.updatePersonUseCase.execute(
        parseInt(request.params.id),
        request.body
      );
      return reply.send(PersonMapper.toDTO(person));
    } catch (error: any) {
      if (error.code === 'P2025') {
        return reply.code(404).send({ error: 'Person not found' });
      }
      if (error.code === 'P2002') {
        return reply.code(400).send({ error: 'Email or CPF already exists' });
      }
      console.error('Update person error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }

  async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      await this.deletePersonUseCase.execute(parseInt(request.params.id));
      return reply.code(204).send();
    } catch (error: any) {
      if (error.code === 'P2025') {
        return reply.code(404).send({ error: 'Person not found' });
      }
      console.error('Delete person error:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  }
}
