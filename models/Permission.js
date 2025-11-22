const mongoose = require('mongoose');
const PermissionSchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
label: { type: String }
});
module.exports = mongoose.model('Permission', PermissionSchema);