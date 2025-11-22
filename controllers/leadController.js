const Lead = require('../models/Lead');

exports.getLeads = async (req, res) => {
  const leads = await Lead.find().populate('owner', 'name email');
  res.json(leads);
};

exports.createLead = async (req, res) => {
  const { title, description } = req.body;
  const lead = await Lead.create({ title, description, owner: req.user._id });
  res.json(lead);
};

exports.updateLead = async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
  res.json(lead);
};

exports.deleteLead = async (req, res) => {
  const { id } = req.params;
  await Lead.findByIdAndDelete(id);
  res.json({ message: 'deleted' });
};
