const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("WorkingOrder", {
    
    id: {
      type: DataTypes.INTEGER,
      allownull:false,
      primaryKey: true,
      autoIncrement: true,
    },

   obsevation:{
      type:DataTypes.STRING,
   },
   
   fallaCliente:{
      type:DataTypes.STRING,
      allownull:false,
   },

   fallaTaller:{
      type:DataTypes.STRING,
      allownull:true,
   },

   comment:{
    type: DataTypes.STRING,
    allowNull: true,
   },

   workingHours: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    garanty: {
        type: DataTypes.ENUM('sin garantía', 'garantía de stock', 'garantía de cliente'),
        allowNull: false,
        defaultValue: 'sin garantía', // Valor predeterminado
    },

    priority:{
        type: DataTypes.ENUM('NORMAL', 'EMPRESAS', 'TEMPORADA'),
        defaultValue: 'NORMAL', //setea todo a prioridad normal
    },

    budget:{ //presupuesto
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    subTotal:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    mora:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    total:{
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    status:{
      type: DataTypes.ENUM(
        'revision',
        'no_reparable',
        'presupuestado',
        'aceptado',
        'rechazado',
        'espera_repuesto',
        'terminado',
        'entregado'
      ),
      defaultValue: 'revision',
    },
    
  }, { timestamps: false });

};

