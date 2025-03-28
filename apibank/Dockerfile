FROM node:18.8.0-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances en premier (meilleure gestion du cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier le reste du code source de l'application
COPY . .

# Générer les fichiers Prisma
RUN npx prisma generate

# Exposer le port 3000 
EXPOSE 3000 



# Démarrer l'application
CMD ["node", "server.js"]
