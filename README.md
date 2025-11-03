# Residência Backend

Backend API com Node.js, Express, TypeScript e Neo4j.

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** - Framework web
- **Neo4j** - Banco de dados de grafos
- **neo4j-driver** - Driver oficial para Neo4j
- **Drizzle ORM** - ORM TypeScript-first (para tipos)

## 📁 Estrutura do Projeto

```
src/
├── config/          # Configurações (database, etc)
├── db/
│   ├── schema/      # Definições de tipos e schemas
│   ├── queries.ts   # Queries do Neo4j
│   └── migrations/  # Migrações (se necessário)
├── routes/          # Rotas da API
├── controllers/     # Controllers
├── middlewares/     # Middlewares customizados
└── index.ts         # Entry point
```

## 🔧 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas credenciais do Neo4j:
```env
NEO4J_URI=neo4j+s://seu-instance.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=sua-senha
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

## 🏃 Executando

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
npm start
```

### Type checking
```bash
npm run typecheck
```

## 📡 API Endpoints

### Users
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Health Check
- `GET /health` - Verificar status do servidor

## 📝 Nota sobre Drizzle ORM

⚠️ **Importante**: Drizzle ORM não tem suporte nativo para Neo4j. Este projeto usa o `neo4j-driver` oficial para interagir com o banco de dados através de queries Cypher.

O Drizzle ORM está incluído no package.json para referência de tipos e estrutura, mas as queries são feitas diretamente com Cypher.

## 🔗 Conectando ao Frontend

O frontend deve estar rodando em `http://localhost:5173` (configurado no CORS).

Exemplo de requisição do frontend:
```typescript
const response = await fetch('http://localhost:3000/api/users');
const users = await response.json();
```
