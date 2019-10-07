FROM node
COPY . .
RUN npm install
RUN cp /src/config.js-sample /src/config.js
EXPOSE 3000
CMD [ "npm", "start" ]