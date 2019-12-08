/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Confirmations', {
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Prison',
        key: 'originalPostId'
      }
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'username'
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
    tableName: 'Confirmations'
  });
};
