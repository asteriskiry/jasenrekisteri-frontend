FROM node
COPY . /app
WORKDIR /app
RUN npm install
RUN cp src/config/config.js-sample src/config/config.js
EXPOSE 3000
CMD [ "npm", "start" ]