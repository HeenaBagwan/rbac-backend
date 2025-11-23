require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const rolesRoutes = require('./routes/roles');
const permissionsRoutes = require('./routes/permissions');

const app = express();
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:5173", "https://rbac-frontend-opal.vercel.app"],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRoutes);

// convenience: expose /api/permissions too (alias)
app.get('/api/permissions', async (req, res) => {
  const Permission = require('./models/Permission');
  const perms = await Permission.find().sort('name');
  res.json(perms);
});

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rbac_system').then(()=>{
  app.listen(PORT, ()=> console.log('🚀 Server on port', PORT));
});
