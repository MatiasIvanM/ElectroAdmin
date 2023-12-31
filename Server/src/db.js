require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,DB_MYSQL,DB_MYSQL_PASS,
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

const sequelize = new Sequelize(`mysql://${DB_MYSQL}:${DB_MYSQL_PASS}@${DB_HOST}:3306/${DB_NAME}`, {
  dialect: 'mysql',  // Usa 'mysql' como dialecto para MySQL
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/Models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/Models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Client, WorkingOrder, Repair, RepairCat, SpareParts, SpareCat} = sequelize.models;

Client.hasMany(WorkingOrder, { foreignKey: 'clientId' }); 
WorkingOrder.belongsTo(Client, { foreignKey: 'clientId' });

WorkingOrder.hasOne(Repair, { foreignKey: 'workingOrderId' }); 
Repair.belongsTo(WorkingOrder, { foreignKey: 'workingOrderId' }); 

Repair.belongsTo(RepairCat, { foreignKey: 'repairCatId' }); 
RepairCat.hasMany(Repair, { foreignKey: 'repairCatId' });

SpareParts.belongsToMany(Repair, { through: 'RepairSpareParts' });
Repair.belongsToMany(SpareParts, { through: 'RepairSpareParts' });

SpareParts.belongsTo(SpareCat, { foreignKey: 'sparePartCatId' }); 
SpareCat.hasMany(SpareParts, { foreignKey: 'sparePartCatId' });

// Aca vendrian las relaciones


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};