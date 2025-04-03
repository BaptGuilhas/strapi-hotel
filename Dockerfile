FROM node:18-alpine
 
# Our working directory 
WORKDIR /app

# Set node env 
ENV NODE_ENV=production

COPY package.json . 
COPY yarn.lock . 
COPY favicon.png . 
COPY src/ src/ 
COPY config/ config/ 
COPY public/robots.txt public/ 
COPY types/ types/

# Install dependencies and run build 
RUN yarn --production --frozen-lockfile
RUN yarn build 

EXPOSE 1337 

CMD ["yarn", "start"] 