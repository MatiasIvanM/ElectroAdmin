const { Client }= require('../../db');


const findAllClient = async() =>{
    const ClientFind= await Client.findAll();

    if(ClientFind.length>0){
        return ClientFind;
        }else{
            return []
        }    
} 


module.exports = findAllClient