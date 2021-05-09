FROM node:12.19-alpine

WORKDIR '/app'

# RUN apk add g++ make python
RUN apk add --no-cache make gcc g++ python pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev
COPY package.json ./

RUN npm install
RUN apk add --no-cache chromium
# RUN apk add --no-cache udev ttf-freefont chromium git

COPY ./ ./

CMD ["npm","run","test"]