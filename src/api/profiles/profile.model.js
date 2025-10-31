const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
    },
    company: {
      type: DataTypes.STRING,
    },
    job_title: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },

    keywords: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    timestamps: true,
    tableName: 'Profiles',
  });

  return Profile;
};