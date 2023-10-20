const { Client } = require('../../db');
const { Op } = require('sequelize');

const findByDni = async (dni) => {
  const bydni = await Client.findAll({
    where: {
      dni: {
        [Op.iLike]: `%${dni}%`
      }
    },
  });

  if (bydni.length < 0) {
    throw new Error('Client not Found');
  }

  return bydni;
};

module.exports = findByDni;