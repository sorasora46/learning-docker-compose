FROM node:slim AS base

ARG VITE_BACKEND_URL

# INSTALL DEPS
FROM base AS deps

WORKDIR /app

COPY package.* ./

RUN npm install

# BUILD
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

# Inject ENV Because Vite can't build dynamically (can't hotswap ENV on the fly)
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# DEPLOY
FROM nginx AS runner

WORKDIR /app

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
