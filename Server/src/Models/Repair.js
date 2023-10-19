const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Repair", {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, 
        unique: true,
      },

    serial:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    article:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    brand:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    model:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    }, { timestamps: false });

};