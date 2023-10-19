const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("RepairCat", {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, 
        unique: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

    subName:{
        type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
}, { timestamps: false });

};