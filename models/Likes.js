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
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'Likes'
  });
};
