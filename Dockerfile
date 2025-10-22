# Use Node 20 oficial
FROM node:20-alpine

# Diretório do app
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia código
COPY . .

# Expõe porta da aplicação
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
