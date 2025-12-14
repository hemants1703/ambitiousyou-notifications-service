FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable pnpm && pnpm i --frozen-lockfile;

COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["pnpm", "start"]