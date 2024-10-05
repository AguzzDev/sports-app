FROM node:16

RUN apt-get update && apt-get install -y \
    ca-certificates \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libx11-6 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxtst6 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /server
COPY . .

RUN rm -rf /app/.cache/puppeteer && rm -rf /app/server/chrome/linux-129.0.6668.58
RUN npm install
RUN npx @puppeteer/browsers install chrome@129.0.6668.58
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]
