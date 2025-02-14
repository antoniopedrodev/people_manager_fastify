## Gerenciador de Pessoas

O objetivo do projeto abaixo foi utilizar o framework Fastify para criar uma api de cadastro de pessoas, incluindo as funções de:

* Criação
* Leitura (Geral e Individual)
* Atualização
* Exclusão

O código foi organizado de acordo com os conceitos de arquitetura limpa e está com uma cobertura geral de testes acima de 90%, seguindo os padrões de exigência da maior parte das empresas do mercado.

Além disso, foi utilizado o Swagger para documentar os endpoints e permitir testes manuais através do navegador, facilitando uma futura integração com o front.

Tecnologias:

* Fastify
* Jest
* TypeScript
* Swagger

Como executar o projeto:

1) Instale as dependências do projeto executando:

    yarn install ou npm install

2)  Dê início a criação da base de dados com o comando:

    yarn prisma:generate ou npm prisma:generate

3) Faça a migração dos dados utilizando o comando:

    yarn prisma:migrate ou npm prisma:migrate

4) Execute o projeto com:

    yarn dev ou npm dev

5) Acesse o swagger através da url:

    http://localhost:3000/documentation

Como executar os testes do projeto:

    Utilize o comando yarn test ou npm test

</br>

## People Manager

The goal of the project below was to use the Fastify framework to create a people registration API, including the following functions:

* Creation
* Reading (General and Individual)
* Updating
* Deleting

The code was organized according to clean architecture concepts and has an overall test coverage of over 90%, following the standards required by most companies in the market.

In addition, Swagger was used to document the endpoints and allow manual testing through the browser, facilitating future integration with the front end.

Technologies:

* Fastify
* Jest
* Swagger
* TypeScript

How to run the project:

1) Install the project dependencies by running:

    yarn install or npm install

2) Start creating the database with the command:

    yarn prisma:generate or npm prisma:generate

3) Migrate the data using the command:

    yarn prisma:migrate or npm prisma:migrate

4) Run the project with:

    yarn dev or npm dev

5) Access swagger through the url:

    http://localhost:3000/documentation

How to run the project tests:

    Use the command yarn test or npm test
