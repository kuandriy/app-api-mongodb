FROM node:12
WORKDIR /usr/src/api
COPY ./ /usr/src/api
EXPOSE 8080
RUN npm install
CMD [ "node", "index.js" ]
ENTRYPOINT npm start