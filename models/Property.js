const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
  title: String,
  address: String,
  price: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Property', PropertySchema);
