const { Client } = require('../../db');
const findByDni = require('./GetByDni');

const createClient = async ({name,lastName,dni,cuil,phone,email,adress,city}) =>{
    const verify = await findByDni(dni)
    if (verify){
        return {error: 'Client alrredy exist'}
    }
    const client = {
        name : name,
        lastName : lastName,
        dni : dni,
        cuil : cuil,
        phone : phone,
        email : email,
        adress : adress,
        city : city,
    }

    const newClient = await Client.create(client)
    return newClient;
}

module.exports = createClient;