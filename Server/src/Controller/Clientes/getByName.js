const { Client } = require('../../db');
const { Op } = require('sequelize');

const findByName = async (name) => {
  const byName = await Client.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`
      }
    },
  });

  if (byName.length < 0) {
    throw new Error('Client not Found');
  }

  return byName;
};

module.exports = findByName;