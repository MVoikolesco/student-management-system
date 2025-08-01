# Sistema de Gerenciamento de Estudantes

Sistema web para gerenciamento de estudantes desenvolvido com Vue.js 3 e Node.js.

Para entender a arquitetura completa do sistema, consulte a [Documentação da Arquitetura](https://github.com/MVoikolesco/student-management-system/wiki/Documenta%C3%A7%C3%A3o-da-Arquitetura-%E2%80%90-Sistema-de-Gerenciamento-de-Estudantes).

## Pré-requisitos

- Docker
- Docker Compose
- Git

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/MVoikolesco/student-management-system.git
cd student-management-system
```

### 2. Configuração do Ambiente

1. Duplique os arquivos de exemplo de ambiente para criar os arquivos de configuração:

```bash
# Na pasta backend
cp .env.example .env

# Na pasta frontend
cp .env.example .env
```

Os arquivos já contêm as configurações necessárias para executar o projeto localmente.

### 3. Iniciando com Docker

O modo mais simples de executar o projeto é usando Docker Compose. Primeiro, vamos instalar as dependências e depois iniciar os containers:

```bash
# Construir e iniciar todos os containers
docker-compose up --build

# Para executar em background
docker-compose up -d --build

# Instalar dependências do frontend e backend
docker-compose run --rm frontend npm install
docker-compose run --rm backend npm install
```

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### 4. Desenvolvimento Local (Sem Docker)

Se preferir desenvolver sem Docker, siga estes passos:

#### Backend

```bash
# Instalar dependências
cd backend
npm install

# Executar migrações do banco de dados
npx prisma migrate deploy

# Iniciar em modo desenvolvimento
npm run dev
```

#### Frontend

```bash
# Instalar dependências
cd frontend
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

## Scripts Disponíveis

### Backend

```bash
npm run dev      # Inicia em modo desenvolvimento
npm run build    # Compila o projeto
npm run start    # Inicia em modo produção
npm run test     # Executa testes
```

### Frontend

```bash
npm run dev      # Inicia em modo desenvolvimento
npm run build    # Compila para produção
npm run preview  # Visualiza build de produção
npm run lint     # Executa linter
```

## Acesso Inicial

Após iniciar o sistema, você pode criar um novo usuário através da página de registro ou usar as credenciais padrão:

```
Email: admin@example.com
Senha: admin123
```

## Estrutura do Projeto

```
.
├── backend/          # API Node.js com Express
├── frontend/         # Aplicação Vue.js
└── docker-compose.yml
```

## Suporte

Para reportar problemas ou sugerir melhorias, por favor abra uma [issue](https://github.com/MVoikolesco/student-management-system/issues).
