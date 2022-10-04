const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      // id가 기본적으로 들어있다.
      email: {
        type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true
      },
    }, {
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 이모티콘 저장
      sequelize,
    });
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' })
    db.User.hasMany(db.Comment);
    db.User.hasOne(db.Image);
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  }
};
