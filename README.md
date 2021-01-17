# Sobre

API desenvolvida no contexto de sistema bancário.
Funcionalidades: Criar conta, Login, Transferências, Saques

# Rodar aplicação localmente

1. É preciso clonar o repositório e instalar as dependencias.
2. Crie um arquivo chamado .env na raiz do projeto, e siga o exemplo do arquivo .env.example
3. Iniciar a aplicação.

```bash
git clone https://github.com/migh1/stone.git
cd stone
yarn install
yarn dev
```

4. Para rodar os testes, execute o seguinte comando abaixo:

```bash
yarn test [--coverage]
```

# Sobre o desenvolvimento

- O projeto utiliza o gerenciamento da memória para 'persistir' os dados, então cada vez que servidor reinicia, os dados são perdidos.
- As rotas são semelhantes ao proposto pelo desafio, foi adicionado o versionamento da API e também todas as rotas estão no contexto de api, para ficar mais simples no desenvolvimento:
  - POST /api/1/accounts
    - { "name": "Michelangelo", "email": "michelangelo@tmnt.com", "password": "cowabunga" }
  - POST /api/1/signin
    - { "name": "Michelangelo", "email": "michelangelo@tmnt.com", "password": "cowabunga" }
  - GET /api/1/transfers
  - POST /api/1/transfers
    - { "target_email": "donatello@tmnt.com", "amount": 15000 }
  - POST /api/1/withdraw
    - { "amount": 30000 }
