import { personSchema, createPersonSchema, updatePersonSchema } from './person.schema';

describe('Person Schemas', () => {
  describe('personSchema', () => {
    it('should have all required properties with correct types', () => {
      expect(personSchema.type).toBe('object');
      expect(personSchema.properties).toHaveProperty('id');
      expect(personSchema.properties).toHaveProperty('name');
      expect(personSchema.properties).toHaveProperty('email');
      expect(personSchema.properties).toHaveProperty('dateOfBirth');
      expect(personSchema.properties).toHaveProperty('cpf');
      expect(personSchema.properties).toHaveProperty('city');
      expect(personSchema.properties).toHaveProperty('state');
      expect(personSchema.properties).toHaveProperty('telephone');
      expect(personSchema.properties).toHaveProperty('createdAt');
      expect(personSchema.properties).toHaveProperty('updatedAt');
    });

    it('should have correct property types', () => {
      expect(personSchema.properties.id.type).toBe('number');
      expect(personSchema.properties.name.type).toBe('string');
      expect(personSchema.properties.email.type).toBe('string');
      expect(personSchema.properties.email.format).toBe('email');
      expect(personSchema.properties.dateOfBirth.type).toBe('string');
      expect(personSchema.properties.dateOfBirth.format).toBe('date');
      expect(personSchema.properties.cpf.type).toBe('string');
      expect(personSchema.properties.city.type).toBe('string');
      expect(personSchema.properties.state.type).toBe('string');
      expect(personSchema.properties.telephone.type).toBe('string');
      expect(personSchema.properties.createdAt.type).toBe('string');
      expect(personSchema.properties.createdAt.format).toBe('date-time');
      expect(personSchema.properties.updatedAt.type).toBe('string');
      expect(personSchema.properties.updatedAt.format).toBe('date-time');
    });
  });

  describe('createPersonSchema', () => {
    it('should have correct required fields', () => {
      expect(createPersonSchema.type).toBe('object');
      expect(createPersonSchema.required).toEqual(['name', 'email', 'dateOfBirth', 'cpf']);
    });

    it('should have all necessary properties with correct types', () => {
      expect(createPersonSchema.properties).toHaveProperty('name');
      expect(createPersonSchema.properties).toHaveProperty('email');
      expect(createPersonSchema.properties).toHaveProperty('dateOfBirth');
      expect(createPersonSchema.properties).toHaveProperty('cpf');
      expect(createPersonSchema.properties).toHaveProperty('city');
      expect(createPersonSchema.properties).toHaveProperty('state');
      expect(createPersonSchema.properties).toHaveProperty('telephone');
    });

    it('should have correct property types', () => {
      expect(createPersonSchema.properties.name.type).toBe('string');
      expect(createPersonSchema.properties.email.type).toBe('string');
      expect(createPersonSchema.properties.email.format).toBe('email');
      expect(createPersonSchema.properties.dateOfBirth.type).toBe('string');
      expect(createPersonSchema.properties.dateOfBirth.format).toBe('date');
      expect(createPersonSchema.properties.cpf.type).toBe('string');
      expect(createPersonSchema.properties.city.type).toBe('string');
      expect(createPersonSchema.properties.state.type).toBe('string');
      expect(createPersonSchema.properties.telephone.type).toBe('string');
    });
  });

  describe('updatePersonSchema', () => {
    it('should be equal to createPersonSchema', () => {
      expect(updatePersonSchema).toEqual(createPersonSchema);
    });

    it('should have the same properties as createPersonSchema', () => {
      expect(Object.keys(updatePersonSchema.properties)).toEqual(
        Object.keys(createPersonSchema.properties)
      );
    });

    it('should have the same required fields as createPersonSchema', () => {
      expect(updatePersonSchema.required).toEqual(createPersonSchema.required);
    });
  });

  describe('Schema Validation Examples', () => {
    const validPerson = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-01',
      cpf: '12345678901',
      city: 'São Paulo',
      state: 'SP',
      telephone: '11999999999',
      createdAt: '2024-02-14T12:00:00Z',
      updatedAt: '2024-02-14T12:00:00Z'
    };

    const validCreatePerson = {
      name: 'John Doe',
      email: 'john@example.com',
      dateOfBirth: '1990-01-01',
      cpf: '12345678901',
      city: 'São Paulo',
      state: 'SP',
      telephone: '11999999999'
    };
  });
});