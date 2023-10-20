const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Client', {
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

        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },

        dni:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
            unique: true,
        },

        cuil:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
            unique: true,
        },

        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },

        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },

        adress:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },

        city:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },

        // socialMedia:{
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },

      }, { timestamps: false });

    };