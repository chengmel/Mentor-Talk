
const { Message, User } = require('../db');
const jwt = require('jsonwebtoken');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`새로운 소켓 연결: ${socket.id}`);

    socket.on('joinRoom', async ({ roomId, token }) => {
      try {
        if (!token) throw new Error('인증 토큰이 없습니다.');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        socket.join(roomId);
        console.log(`유저(id: ${decoded.id})가 방(id: ${roomId})에 입장했습니다.`);
        
      } catch (error) {
        console.error('방 입장 오류:', error.message);
        socket.emit('error', '방 입장에 실패했습니다. 인증을 확인해주세요.');
      }
    });

    socket.on('sendMessage', async ({ roomId, token, content }) => {
      try {
        if (!token) throw new Error('인증 토큰이 없습니다.');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const senderId = decoded.id;
        const message = await Message.create({
          roomId,
          senderId,
          content,
        });

        const sender = await User.findByPk(senderId, { attributes: ['nickname'] });
        const messageData = {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          Sender: {
            id: senderId,
            nickname: sender.nickname,
          },
        };
        io.to(roomId).emit('receiveMessage', messageData);
        console.log(`메시지 전송 (방: ${roomId}): ${content}`);

      } catch (error) {
        console.error('메시지 전송 오류:', error.message);
        socket.emit('error', '메시지 전송에 실패했습니다.');
      }
    });

    socket.on('disconnect', () => {
      console.log(`소켓 연결 끊어짐: ${socket.id}`);
    });
  });
};