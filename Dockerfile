FROM node:9.2.1

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . /usr/local/app
RUN npm install -g -s --no-progress yarn node-gyp && \
    yarn
#    && \
#    npm rebuild node-sass --force
CMD [ "npm", "run", "docker" ]
EXPOSE 80
