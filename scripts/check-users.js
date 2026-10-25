const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://technosedigital_db_user:GjbqCx1qlrwhDwEs@projects.4wf30bz.mongodb.net/Sindh-Connect';

async function checkAdmin() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const users = await db.collection('users').find({}).toArray();
  console.log('Registered Users:', users.map(u => ({ email: u.email, role: u.role, name: u.name, id: u._id })));
  await mongoose.disconnect();
}

checkAdmin().catch(console.error);
