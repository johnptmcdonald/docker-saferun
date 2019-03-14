FROM node:5-slim
COPY script.sh ./
CMD ["sh", "script.sh"]