import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import prismaPlugin from './prisma';

jest.mock('@prisma/client', () => {
  const PrismaClientMock = jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  }));
  return { PrismaClient: PrismaClientMock };
});

describe('Prisma Plugin', () => {
  let app: ReturnType<typeof fastify>;

  beforeEach(() => {
    app = fastify();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should register Prisma plugin and connect to database', async () => {
    await app.register(prismaPlugin);
    
    expect(app.prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalledTimes(1);
    expect(app.prisma.$connect).toHaveBeenCalledTimes(1);
  });

  it('should disconnect Prisma on server close', async () => {
    await app.register(prismaPlugin);
    await app.close();

    expect(app.prisma.$disconnect).toHaveBeenCalledTimes(1);
  });
});
