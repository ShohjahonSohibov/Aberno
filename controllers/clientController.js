const Client = require("../models/Client"); 

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();

    res.status(201).json({ message: "Client created successfully", client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getClients = async (req, res) => {
  try {
    const { isActive } = req.query;
    let query = {};

    if (isActive) {
      query["isActive"] = isActive; 
    }

    const clients = await Client.find(query);
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSingleClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    client.nameUz = req.body.nameUz || client.nameUz;
    client.nameRu = req.body.nameRu || client.nameRu;
    client.nameEn = req.body.nameEn || client.nameEn;
    client.image = req.body.image || client.image;
    client.isActive = req.body.isActive !== undefined ? req.body.isActive : client.isActive;

    await client.save();

    res.json({ message: "Client updated successfully", client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
