import { Person } from './Person';

describe('Person Entity', () => {
  const validPersonData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    dateOfBirth: new Date('1990-01-01'),
    cpf: '12345678901',
    city: 'New York',
    state: 'NY',
    address: 'Times Square',
    telephone: '1234567890'
  };

  it('should create a valid person', () => {
    const person = new Person(
      validPersonData.id,
      validPersonData.name,
      validPersonData.email,
      validPersonData.dateOfBirth,
      validPersonData.cpf,
      validPersonData.city,
      validPersonData.state,
      validPersonData.address,
      validPersonData.telephone
    );

    expect(person).toBeInstanceOf(Person);
    expect(person.name).toBe(validPersonData.name);
    expect(person.email).toBe(validPersonData.email);
    expect(person.cpf).toBe(validPersonData.cpf);
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Person(
        1,
        '',
        validPersonData.email,
        validPersonData.dateOfBirth,
        validPersonData.cpf,
        validPersonData.city,
        validPersonData.state
      );
    }).toThrow('Name is required');
  });

  it('should throw error when email is empty', () => {
    expect(() => {
      new Person(
        1,
        validPersonData.name,
        '',
        validPersonData.dateOfBirth,
        validPersonData.cpf,
        validPersonData.city,
        validPersonData.state
      );
    }).toThrow('Email is required');
  });

  it('should throw error when CPF is empty', () => {
    expect(() => {
      new Person(
        validPersonData.id,
        validPersonData.name,
        validPersonData.email,
        validPersonData.dateOfBirth,
        '',
        validPersonData.city,
        validPersonData.state,
        validPersonData.telephone
      );
    }).toThrow('CPF is required');
  });

  it('should throw error when City is empty', () => {
    expect(() => {
      new Person(
        validPersonData.id,
        validPersonData.name,
        validPersonData.email,
        validPersonData.dateOfBirth,
        validPersonData.cpf,
        '',
        validPersonData.state,
        validPersonData.telephone
      );
    }).toThrow('City is required');
  });

  it('should throw error when State is empty', () => {
    expect(() => {
      new Person(
        validPersonData.id,
        validPersonData.name,
        validPersonData.email,
        validPersonData.dateOfBirth,
        validPersonData.cpf,
        validPersonData.city,
        '',
        validPersonData.telephone
      );
    }).toThrow('State is required');
  });

});