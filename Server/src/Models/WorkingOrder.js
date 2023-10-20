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
        defaultValue: 'sin garantía', 
    },

    priority:{
        type: DataTypes.ENUM('NORMAL', 'EMPRESAS', 'TEMPORADA'),
        defaultValue: 'NORMAL', 
    },

    budget:{ //presupuesto
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      }
    },

    busPack:{
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

    payment:{
      type:DataTypes.BOOLEAN,
       allowNull: false,
       defaultValue: true,
    },

    paymentMethod: {
      type:DataTypes.STRING,
      allowNull:false,
    },

    entregadoA:{
      type: DataTypes.STRING,
      allowNull: false,
      },
    
    status:{
      type: DataTypes.ENUM(
        'revision',
        'no_reparable',
        'presupuestado',
        'aceptado',
        'rechazado',
        'en_reparecion',
        'espera_repuesto',
        'terminado',
        'pagado',
        'entregado'
      ),
      defaultValue: 'revision',
    },
    
  }, { timestamps: false });

};

