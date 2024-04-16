FROM node:18-alpine as base
ENV NEXT_TELEMETRY_DISABLED 1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NEXT_TELEMETRY_DISABLED 1
# enbable corepack to use pnpm
RUN corepack enable
# COPY . /pulsecare-webapp
WORKDIR /pulsecare-webapp
# Exposing port for when NOT running with docker-compose
EXPOSE 3000
# Args from .env file 
ARG DATABASE_URL
ARG AUTH_URL
ARG AUTH_SECRET
ARG AUTH_GOOGLE_ID
ARG AUTH_GOOGLE_SECRET

FROM base AS deps
WORKDIR /pulsecare-webapp

COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Trying to freshly install prisma client every time as suggested here: https://github.com/prisma/prisma/issues/7234#issuecomment-846606919
RUN pnpm dlx prisma generate --schema=prisma/schema.prisma


FROM deps as development
# RUN ls -la node_modules/.prisma/client
ENV PORT 3000
CMD ["pnpm", "dev"]


FROM base as builder
COPY --from=deps /pulsecare-webapp/node_modules ./node_modules
COPY . .
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
ENV DATABASE_URL=$DATABASE_URL  
ENV AUTH_URL=$AUTH_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID
ENV AUTH_GOOGLE_SECRET=$AUTH_GOOGLE_SECRET
RUN echo $DATABASE_URL
RUN echo $AUTH_URL
RUN echo $AUTH_SECRET
RUN pnpm build

FROM base as runner
WORKDIR /pulsecare-webapp

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /pulsecare-webapp/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /pulsecare-webapp/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /pulsecare-webapp/.next/static ./.next/static

USER nextjs

CMD node server.js

