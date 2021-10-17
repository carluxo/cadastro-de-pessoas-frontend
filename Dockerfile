from node:14

COPY . .
EXPOSE 5000
RUN npm i
ENTRYPOINT ["npm", "run", "start"]