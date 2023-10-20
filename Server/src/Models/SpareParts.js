const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("SpareParts", {
    
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

    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

    brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    cryticStock:{
      type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    
    available:{
       type:DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
    },

    }, { timestamps: false });

};