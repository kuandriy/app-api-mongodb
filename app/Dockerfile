FROM node:12
WORKDIR /usr/src/app
COPY ./ /usr/src/app
EXPOSE 8080
RUN npm install
CMD [ "node", "index.js" ]
ENTRYPOINT npm start