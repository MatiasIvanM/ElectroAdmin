
const findClientById = require("../../Controller/Clientes/getById");

  const ClientById = async (req, res) => {
    const { id } = req.params;
    try {
      const clientFind = await findClientById(id);
      if (clientFind) {
        res.status(200).json(clientFind);
      } else {
        res.status(404).json({ mje: "Customer not found" });
      }
    } catch (error) {
      res.status(500).json({
        error: `Error: ${error.message}`,
      });
    }
  };

  module.exports=ClientById; 