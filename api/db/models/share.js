module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    ideaId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Share.associate = (models) => {
    // associations can be defined here
    Share.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Share;
};
