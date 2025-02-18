export interface CreatePersonDTO {
  name: string,
  email: string,
  dateOfBirth: Date,
  cpf: string,
  city: string,
  state: string,
  address?: string,
  telephone?: string,
}

export interface UpdatePersonDTO extends CreatePersonDTO {}
