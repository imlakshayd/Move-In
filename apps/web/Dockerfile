# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app

# Copy package metadata for dependency install (supports local file dependency ../../)
COPY package*.json ./
COPY apps/web/package*.json apps/web/
RUN npm ci --prefix apps/web

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/apps/web/node_modules /app/apps/web/node_modules
COPY . .
ARG REACT_APP_API_URL=http://localhost:5000
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build --prefix apps/web

FROM nginx:1.27-alpine AS runner
COPY --from=build /app/apps/web/build /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
