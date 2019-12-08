/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Posts', {
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'username'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('image','video','text'),
      allowNull: false
    },
    postContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    updateAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'Posts'
  });
};
