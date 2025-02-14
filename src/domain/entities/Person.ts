export class Person {
  constructor(
    public readonly id: number | null,
    public readonly name: string,
    public readonly email: string,
    public readonly dateOfBirth: Date,
    public readonly cpf: string,
    public readonly city: string,
    public readonly state: string,
    public readonly telephone?: string,
    public readonly address?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
    if (!this.dateOfBirth) throw new Error('Date of birth is required');
    if (!this.cpf) throw new Error('CPF is required');
    if (!this.city) throw new Error('City is required');
    if (!this.state) throw new Error('State is required');
  }
}
