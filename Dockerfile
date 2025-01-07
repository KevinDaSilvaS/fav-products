FROM denoland/deno:2.1.4 as base

WORKDIR /backend

COPY . .

EXPOSE 8080

RUN deno compile --allow-net --allow-env --allow-read main.ts

CMD ./backend