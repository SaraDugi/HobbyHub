const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

const routes = [
  { path: '/api/users', file: './src/routes/userRoutes' },
  { path: '/api/tasks', file: './src/routes/taskRoutes' },
  { path: '/api/progress_logs', file: './src/routes/progressRoutes' },
  { path: '/api/achievements', file: './src/routes/achievementsRoutes' },
  { path: '/api/calendar_entries', file: './src/routes/calendarRoutes' },
  { path: '/api/user_settings', file: './src/routes/settingsRoutes' },
  { path: '/api/user_profiles', file: './src/routes/userProfileRoutes' },
];

routes.forEach(({ path, file }) => {
  app.use(path, require(file));
});

app.get('/', (req, res) => {
  res.send('🎉 HobbyHub REST API is running');
});

app.listen(port, () => {
  console.log(`Strežnik teče na http://localhost:${port}`);
  console.log('\nAvailable API routes:');
  routes.forEach(({ path }) => {
    console.log(`   ➤ ${path}`);
  });
});