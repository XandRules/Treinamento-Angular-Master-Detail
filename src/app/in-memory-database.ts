import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api'

export class InMemoryDatabase implements InMemoryDbService{


  createDb() {
    const categories = [
      {id: 1, name: "Lazer", description: "Cinema, Parques, Praia, etc"},
      {id: 2, name: "Saúde", description: "Plano de saúde e remédios"},
      {id: 3, name: "Moradia", description: "Pagamentos de conta da casa"},
      {id: 4, name: "Salário", description: "Recebimento de salário"},
      {id: 5, name: "Freelas", description: "Trabalhos como freelancer"}
    ]

    return { categories };
  }
}
