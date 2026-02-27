# Stage 1: Build
FROM node:18-alpine AS builder

# Mettre à jour les dépôts et installer git (nécessaire pour VitePress lastUpdated)
RUN apk update && apk add --no-cache git

WORKDIR /app

# Copier les fichiers de configuration
COPY package.json yarn.lock* package-lock.json* ./

# Installer les dépendances avec retry en cas d'erreur réseau
RUN npm install --legacy-peer-deps || npm install --legacy-peer-deps || npm install --legacy-peer-deps

# Copier les fichiers de documentation
COPY docs ./docs
COPY . .

# Initialiser un repo git minimal si .git n'existe pas (pour VitePress lastUpdated)
RUN if [ ! -d .git ]; then \
    git init && \
    git config user.email "build@docker" && \
    git config user.name "Docker Build" && \
    git add . && \
    git commit -m "Initial commit for build"; \
    fi

# Construire la documentation
RUN npm run docs:build

# Stage 2: Serve
FROM nginx:alpine

# Copier les fichiers construits depuis le stage builder
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html

# Exposer le port 5000
EXPOSE 5000

# Configurer nginx pour écouter sur le port 5000
RUN echo 'server { \
    listen 5000; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

