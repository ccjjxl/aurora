FROM node:20-alpine AS base


FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package.json  package-lock.json*  ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
  

ENV NODE_ENV production

EXPOSE 3000
ENV PORT 3000

CMD [ "npm", "run", "start" ]