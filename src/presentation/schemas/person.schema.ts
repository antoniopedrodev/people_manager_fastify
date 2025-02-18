export const personSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    dateOfBirth: { type: 'string', format: 'date' },
    cpf: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    address: { type: 'string' },
    telephone: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

export const createPersonSchema = {
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
    telephone: { type: 'string' }
  }
};

export const updatePersonSchema = createPersonSchema;
