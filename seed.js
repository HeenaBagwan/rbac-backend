require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./db');
const Role = require('./models/Role');
const Permission = require('./models/Permission');
const User = require('./models/User');
const perms = [
{ name: "create_user", label: "Create Users" },
{ name: "view_users", label: "View Users" },
{ name: "update_user", label: "Update Users" },
{ name: "delete_user", label: "Delete Users" },
{ name: "update_user_role", label: "Update User Role" },


{ name: "create_leads", label: "Create Leads" },
{ name: "view_leads", label: "View Leads" },
{ name: "update_leads", label: "Update Leads" },
{ name: "delete_leads", label: "Delete Leads" },


{ name: "create_property", label: "Create Properties" },
{ name: "view_property", label: "View Properties" },
{ name: "update_property", label: "Update Properties" },
{ name: "delete_property", label: "Delete Properties" },


{ name: "create_activity", label: "Create Activities" },
{ name: "view_activity", label: "View Activities" },
{ name: "update_activity", label: "Update Activities" },
{ name: "delete_activity", label: "Delete Activities" },


{ name: "system_management", label: "System Management" },
{ name: "view_reports", label: "View Reports" },
{ name: "export_data", label: "Export Data" },
{ name: "import_data", label: "Import Data" },


{ name: "view_roles", label: "View Roles" },
{ name: "create_role", label: "Create Role" },
{ name: "update_role", label: "Update Role" }
];


const run = async () => {
await connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rbac_system');
await Permission.deleteMany({});
await Role.deleteMany({});
await User.deleteMany({});


const createdPerms = await Permission.insertMany(perms);
const map = createdPerms.reduce((a,p)=>{ a[p.name]=p._id; return a },{});


const adminPerms = Object.keys(map).map(k => map[k]);
const managerPerms = [map.view_users, map.update_user, map.update_user_role, map.view_roles, map.create_leads, map.view_leads, map.update_leads, map.view_property, map.update_property, map.view_activity, map.update_activity, map.view_reports].filter(Boolean);
const agentPerms = [map.view_leads, map.create_leads, map.update_leads, map.view_activity, map.create_activity, map.update_activity, map.view_property].filter(Boolean);
const sellerPerms = [map.create_property, map.view_property, map.update_property].filter(Boolean);
const buyerPerms = [map.view_property].filter(Boolean);


const adminRole = await Role.create({ name: 'Admin', description: 'Full system access', permissions: adminPerms });
const managerRole = await Role.create({ name: 'Manager', description: 'Team management', permissions: managerPerms });
const agentRole = await Role.create({ name: 'Agent', description: 'Sales agent', permissions: agentPerms });
const sellerRole = await Role.create({ name: 'Seller', description: 'Property owner', permissions: sellerPerms });
const buyerRole = await Role.create({ name: 'Buyer', description: 'Buyer', permissions: buyerPerms });


const hash = await bcrypt.hash('password123', 10);
await User.create({ name: 'super admin', email: 'superadmin@test.com', password: 'password123', role: adminRole._id });
await User.create({ name: 'Admin User', email: 'admin@test.com', password: 'password123', role: adminRole._id });
await User.create({ name: 'Manager User', email: 'manager@test.com', password: 'password123', role: managerRole._id });
await User.create({ name: 'Agent User', email: 'agent@test.com', password: 'password123', role: agentRole._id });


console.log('Seed done');
process.exit(0);
};


run().catch(err => { console.error(err); process.exit(1); });