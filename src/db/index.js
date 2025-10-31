const { Sequelize } = require('sequelize');
const config = require('../config/config');
const createUserModel = require('../api/users/user.model');
const createProfileModel = require('../api/profiles/profile.model');
const createChatModels = require('../api/chat/chat.model');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = createUserModel(sequelize);
db.Profile = createProfileModel(sequelize);
const { ChatRoom, Message } = createChatModels(sequelize);
db.ChatRoom = ChatRoom;
db.Message = Message;

db.User.hasOne(db.Profile, { foreignKey: 'userId' });
db.Profile.belongsTo(db.User, { foreignKey: 'userId' });
db.User.hasMany(db.ChatRoom, { as: 'JuniorRooms', foreignKey: 'juniorId' });
db.User.hasMany(db.ChatRoom, { as: 'SeniorRooms', foreignKey: 'seniorId' });
db.ChatRoom.belongsTo(db.User, { as: 'Junior', foreignKey: 'juniorId' });
db.ChatRoom.belongsTo(db.User, { as: 'Senior', foreignKey: 'seniorId' });

db.ChatRoom.hasMany(db.Message, { foreignKey: 'roomId' });
db.Message.belongsTo(db.ChatRoom, { foreignKey: 'roomId' });

db.User.hasMany(db.Message, { foreignKey: 'senderId' });
db.Message.belongsTo(db.User, { as: 'Sender', foreignKey: 'senderId' });


module.exports = db;