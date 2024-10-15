FROM node:16-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/package*.json ./

RUN npm install --only=production

ENV NODE_ENV = production
ENV PORT = 5000
ENV JWT_SECRET = secret
ENV DATABASE_URL = mysql://root:root@localhost:3306/fitness_tracker
ENV API_KEY = API_KEY

EXPOSE 5000

CMD ["npm", "start"]