import { PrismaClient } from '@prisma/client';
import { Person } from '../../domain/entities/Person';
import { IPersonRepository } from '../../domain/repositories/IPersonRepository';

export class PrismaPersonRepository implements IPersonRepository {
  constructor(private prisma: PrismaClient) {}

  async create(person: Person): Promise<Person> {
    const created = await this.prisma.person.create({
      data: {
        name: person.name,
        email: person.email,
        dateOfBirth: person.dateOfBirth,
        cpf: person.cpf,
        city: person.city,
        state: person.state,
        telephone: person.telephone,
      },
    });

    return this.mapToDomain(created);
  }

  async findAll(): Promise<Person[]> {
    const people = await this.prisma.person.findMany();
    return people.map((person) => this.mapToDomain(person));
  }

  async findById(id: number): Promise<Person | null> {
    const person = await this.prisma.person.findUnique({
      where: { id },
    });

    return person ? this.mapToDomain(person) : null;
  }

  async update(id: number, person: Person): Promise<Person> {
    const updated = await this.prisma.person.update({
      where: { id },
      data: {
        name: person.name,
        email: person.email,
        dateOfBirth: person.dateOfBirth,
        cpf: person.cpf,
        city: person.city,
        state: person.state,
        telephone: person.telephone,
      },
    });

    return this.mapToDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.person.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaModel: any): Person {
    return new Person(
      prismaModel.id,
      prismaModel.name,
      prismaModel.email,
      new Date(prismaModel.dateOfBirth),
      prismaModel.cpf,
      prismaModel.city,
      prismaModel.state,
      prismaModel.telephone,
      prismaModel.createdAt,
      prismaModel.updatedAt
    );
  }
}
