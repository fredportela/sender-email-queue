# Base image
FROM node:20-alpine

# Criar diretório da aplicação
WORKDIR /usr/src/app

# Instalar PM2 globalmente
RUN npm install pm2 -g

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar arquivos do projeto
COPY . .

# Copiar arquivo .env para o diretório da aplicação (opcional - remova se usar variáveis de ambiente no Docker)
COPY .env .env

# Compilar o projeto
RUN npm run build

# Porta exposta pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação com PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
