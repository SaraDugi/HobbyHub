const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client', 'public')));

const checkJwt = require('./src/middleware/auth');
const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);

const routes = [
  { path: '/api/users', file: './src/routes/userRoutes', protected: true },
  { path: '/api/tasks', file: './src/routes/taskRoutes', protected: true },
  { path: '/api/progress_logs', file: './src/routes/progressRoutes', protected: true },
  { path: '/api/achievements', file: './src/routes/achievementsRoutes', protected: true },
  { path: '/api/calendar_entries', file: './src/routes/calendarRoutes', protected: true },
  { path: '/api/user_settings', file: './src/routes/settingsRoutes', protected: true },
  { path: '/api/user_profiles', file: './src/routes/userProfileRoutes', protected: true }
];

routes.forEach(({ path, file, protected: isProtected }) => {
  const routeHandler = require(file);
  if (isProtected) {
    app.use(path, checkJwt, routeHandler);
  } else {
    app.use(path, routeHandler);
  }
});

app.get('/funkcionalnosti-odjemalca/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'funkcionalnosti.html'));
});

app.get('/posebnosti/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'posebnosti.txt'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'login.html'));
});

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Strežnik teče na: http://localhost:${port}`);
  console.log('Zaščiteni API-ji:');
  routes.forEach(({ path }) => console.log(`   ➤ ${path}`));
  console.log('Dodatne poti:');
  console.log('   ➤ /funkcionalnosti-odjemalca/');
  console.log('   ➤ /posebnosti/');
});