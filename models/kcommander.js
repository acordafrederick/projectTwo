module.exports = function(sequelize, DataTypes) {
    var Commander = sequelize.define("Commander", {
      // The email cannot be null, and must be a proper email before creation
      commanderName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    });

    return Commander;
  };