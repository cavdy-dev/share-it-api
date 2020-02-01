module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      }
    },
    {}
  );
  User.associate = models => {
    // associations can be defined here
  };
  return User;
};
