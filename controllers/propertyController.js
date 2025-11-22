const Property = require('../models/Property');

exports.getProperties = async (req, res) => {
  const props = await Property.find().populate('owner', 'name email');
  res.json(props);
};

exports.createProperty = async (req, res) => {
  const { title, address, price } = req.body;
  const prop = await Property.create({ title, address, price, owner: req.user._id });
  res.json(prop);
};

exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const prop = await Property.findByIdAndUpdate(id, req.body, { new: true });
  res.json(prop);
};

exports.deleteProperty = async (req, res) => {
  const { id } = req.params;
  await Property.findByIdAndDelete(id);
  res.json({ message: 'deleted' });
};
