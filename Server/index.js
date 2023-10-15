const server = require("./src/app");
const PORT = process.env.PORT || 3001;
const { conn } = require('./src/db');


conn.sync({ force : true }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s ElectroAdmin running in port ${PORT}`); 
  });
})
// Syncing all the models at once.
