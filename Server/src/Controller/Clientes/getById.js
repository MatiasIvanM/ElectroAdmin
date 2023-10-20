const {Client, Repair}=require('../../db');


const findClientById = async(id) =>{
    const clientFind = await Client.findByPk(id, {
        include: [{ model: Repair }],
      });

    if(clientFind){
     return clientFind
 }else{
     return null;
 }
 }

module.exports = findClientById;