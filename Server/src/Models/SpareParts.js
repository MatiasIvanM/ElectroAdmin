const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("SpareParts", {
    
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4, 
        unique: true,
      },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
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
        defaultValue: 1,
      },
    brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    available:{
       type:DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
    },

    }, { timestamps: false });

};