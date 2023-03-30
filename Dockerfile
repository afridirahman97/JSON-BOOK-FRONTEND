FROM nginx:1.17.1-alpine
COPY /dist/json-book /usr/share/nginx/html
