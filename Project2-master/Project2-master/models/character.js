module.exports = function(sequelize, DataTypes) {
    var Character = sequelize.define("Character", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 30]
        }
      },
      knowlege: {
        type: DataTypes.INTEGER,
        defaultValue: false
      },
      sanity: {
        type: DataTypes.INTEGER,
        defaultValue: false
      },
      power: {
        type: DataTypes.INTEGER,
        defaultValue: false
      }
    });
    return Character;

    
  };
