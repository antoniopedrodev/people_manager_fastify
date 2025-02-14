export interface CreatePersonDTO {
  name: string,
  email: string,
  dateOfBirth: Date,
  cpf: string,
  city: string,
  state: string,
  telephone?: string,
  address?: string,
}

export interface UpdatePersonDTO extends CreatePersonDTO {}
