from node:7.0.0-slim
MAINTAINER Jay Thomas <jay@gfax.ch

## App setup
RUN npm install

RUN mkdir /usr/app
WORKDIR /usr/app
COPY . /usr/app

# Launch backend
CMD ["npm", "run", "dev"]
