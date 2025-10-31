require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const { sequelize } = require('./src/db');
const apiRouter = require('./src/api');
const initializeSocket = require('./src/sockets/chat.socket');
const errorHandler = require('./src/middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', apiRouter);

app.use(errorHandler);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('데이터베이스 연결 성공');
    await sequelize.sync({ force: false });
    console.log('모든 모델이 전부 동기화');
  } catch (error) {
    console.error('데이터베이스 연결 또는 동기화 실패:', error);
  }
}

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

initializeSocket(io);

server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중`);
});