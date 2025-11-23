FROM node:22-alpine AS builder

RUN corepack enable pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN pnpm build


FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
ARG DOMAIN

RUN sed -i "s/\$DOMAIN/${DOMAIN}/g" /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

