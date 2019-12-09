/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Likes', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'username'
      }
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Posts',
        key: 'postID'
      }
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Likes'
  });
};
