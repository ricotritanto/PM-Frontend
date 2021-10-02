FROM node:14-alpine

RUN apk update && \
    apk upgrade && \
    apk add bash git && \
    apk add gcc && \
    apk add musl-dev && \
    apk add curl && \
    apk add python && \
    apk add make && \
    apk add g++
    
RUN apk add tzdata curl \
    && rm -f /etc/localtime \
    && cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime \
    && echo "Asia/Jakarta" > /etc/timezone

RUN mkdir -p /home/pm/be/src/node_modules
COPY . /home/pm/fe/src
WORKDIR /home/pm/fe/src

RUN chmod +x run-script.sh
CMD ["sh", "./run-script.sh" ]
