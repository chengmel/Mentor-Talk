const { DataTypes } = require('sequelize');

function createChatModels(sequelize) {
  const ChatRoom = sequelize.define('ChatRoom', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  }, {
    timestamps: true,
    tableName: 'ChatRooms',
  });

  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    tableName: 'Messages',
  });

  return { ChatRoom, Message };
}

module.exports = createChatModels;