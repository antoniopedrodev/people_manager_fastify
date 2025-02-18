import Fastify from 'fastify';
import prismaPlugin from './infrastructure/plugins/prisma';
import personRoutes from './presentation/routes/person.routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';

const build = async () => {
  const fastify = Fastify({
    logger: true,
  });

  
  await fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'People Manager API',
        description: 'API documentation for the People Manager application',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  await fastify.register(prismaPlugin);
  await fastify.register(personRoutes, { prefix: '/api/people' });

  return fastify;
};

export default build;
