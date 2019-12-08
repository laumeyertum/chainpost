/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Prison', {
    originalPostId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Posts',
        key: 'postId'
      }
    },
    repostPostId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'postId'
      }
    },
    flaggerUsername: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'username'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'Prison'
  });
};
