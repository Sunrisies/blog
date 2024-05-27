FROM alpine:latest as build-stage

RUN apk add --no-cache --update nodejs npm yarn 
WORKDIR /temp
COPY src .
COPY package.json .
COPY tsconfig.json .
COPY nest-cli.json .
RUN yarn  --registry https://registry.npmmirror.com/  
RUN yarn  build

FROM alpine:latest as production-stage
RUN apk add --no-cache --update nodejs
WORKDIR /app
COPY --from=build-stage /temp/dist ./dist
COPY --from=build-stage /temp/node_modules ./node_modules
COPY --from=build-stage /temp/nest-cli.json ./nest-cli.json
COPY --from=build-stage /temp/tsconfig.json ./tsconfig.json
COPY --from=build-stage /temp/package.json ./package.json
CMD ["sh", "-c", "node dist/main.js"]