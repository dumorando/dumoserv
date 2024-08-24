FROM node:20-bookworm

WORKDIR /etc/dumoserv

COPY ./ /etc/dumoserv/src
COPY ./conf /etc/dumoserv/conf

WORKDIR /etc/dumoserv/src

#download dependencies
RUN npm i

CMD ["node", "index.js"]