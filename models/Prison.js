/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Prison', {
    repostPostId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Posts',
        key: 'postId'
      }
    },
    originalPostId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Posts',
        key: 'postId'
      }
    },
    flagger: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'username'
      }
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
    tableName: 'Prison'
  });
};
