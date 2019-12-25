FROM node
WORKDIR /src
COPY . .
RUN yarn
ENTRYPOINT ["yarn", "start"]
