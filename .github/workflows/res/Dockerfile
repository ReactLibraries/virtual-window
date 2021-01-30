FROM caddy:alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY . /app
RUN echo -e "basicauth / {\n  ${USER:-user} `caddy hash-password -plaintext ${PASSWORD:-password}`\n}" >> /etc/caddy/Caddyfile
