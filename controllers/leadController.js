const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();

    res.status(201).json({ message: "Lead created successfully", lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { isActive, page = 1, limit = 10, search, status } = req.query;
    let query = {};

    if (isActive) {
      query["isActive"] = isActive;
    }
    
    if (status) {
      query["status"] = status;
    }

    if (search) {
      query["titleUz"] = { $regex: search, $options: 'i' }; // Case-insensitive search
      query["titleRu"] = { $regex: search, $options: 'i' }; // Case-insensitive search
      query["titleEn"] = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const skip = (page - 1) * limit;

    let sort = {};
    sort['_id'] = -1;

    const leads = await Lead.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    .sort(sort);

    const counts = await Lead.countDocuments(query)

    res.json({counts, leads });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getSingleLead = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findById({ _id: id });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findById({ _id: id });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.name = req.body.name || lead.name;
    lead.phone = req.body.phone || lead.phone;
    lead.text = req.body.text || lead.text;
    lead.email = req.body.email || lead.email;
    lead.status = req.body.status || lead.status;
    lead.isActive = req.body.isActive !== undefined ? req.body.isActive : lead.isActive;

    await lead.save();

    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateStatusLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findById({ _id: id });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = req.query.status || lead.status;

    await lead.save();

    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
