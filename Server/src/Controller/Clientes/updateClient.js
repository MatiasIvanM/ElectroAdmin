const {Client}=require('../../db');


const updateClient = async ({id,name,lastName,dni,cuil,email,address,phone,city})=>{   
    const clientFind = await Client.findByPk(id);
    if (!clientFind) {
        throw new Error('Customer not found');
    }

    clientFind.id = id;
    clientFind.name = name;
    clientFind.name = lastName;
    clientFind.name = dni;
    clientFind.name = cuil;
    clientFind.phone = phone;
    clientFind.email = email;
    clientFind.address = address;
    clientFind.city = city;
    await clientFind.save();

    return clientFind;
}

module.exports = updateClient;