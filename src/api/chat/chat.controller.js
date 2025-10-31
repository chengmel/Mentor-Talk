const { ChatRoom, User, Message } = require('../../db');

const chatController = {
  async createOrGetChatRoom(req, res) {
    try {
      const juniorId = req.user.id;
      const { seniorId } = req.body;

      if (!seniorId) {
        return res.status(400).json({ message: '선배 ID가 필요합니다.' });
      }

      if (juniorId === parseInt(seniorId, 10)) {
        return res.status(400).json({ message: '자기 자신과는 채팅할 수 없습니다.' });
      }

      let chatRoom = await ChatRoom.findOne({
        where: { juniorId, seniorId },
      });

      if (!chatRoom) {
        const seniorUser = await User.findByPk(seniorId);
        if (!seniorUser || seniorUser.role !== 'SENIOR') {
          return res.status(404).json({ message: '해당 선배를 찾을 수 없습니다.' });
        }
        
        chatRoom = await ChatRoom.create({ juniorId, seniorId });
      }

      res.status(200).json(chatRoom);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async listMyChatRooms(req, res) {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        const whereClause = userRole === 'JUNIOR' 
            ? { juniorId: userId } 
            : { seniorId: userId };

        const rooms = await ChatRoom.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'Senior', attributes: ['id', 'nickname'] },
                { model: User, as: 'Junior', attributes: ['id', 'nickname'] },
            ],
            order: [['updatedAt', 'DESC']]
        });

        res.status(200).json(rooms);
    } catch (error) {
        console.error('서버 오류:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  },

  async getMessagesByRoom(req, res) {
    try {
      const { roomId } = req.params;
      const userId = req.user.id;

      const room = await ChatRoom.findByPk(roomId);
      if (!room || (room.juniorId !== userId && room.seniorId !== userId)) {
        return res.status(403).json({ message: '채팅방에 접근할 권한이 없습니다.' });
      }

      const messages = await Message.findAll({
        where: { roomId },
        include: [{
          model: User,
          as: 'Sender',
          attributes: ['id', 'nickname'],
        }],
        order: [['createdAt', 'ASC']],
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error('서버 오류:', error);
      res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
  }
};

module.exports = chatController;