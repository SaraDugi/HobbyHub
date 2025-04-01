const express = require('express');
require('dotenv').config();
const { auth } = require('express-oauth2-jwt-bearer');

const app = express();
const port = process.env.PORT || 3000;

const checkJwt = auth({
  audience: process.env.OAUTH_AUDIENCE,
  issuerBaseURL: process.env.OAUTH_ISSUER,
  tokenSigningAlg: 'RS256',
});

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
app.use('/api', authRoutes);

const routes = [
  { path: '/api/users', file: './src/routes/userRoutes', protected: true },
  { path: '/api/tasks', file: './src/routes/taskRoutes', protected: true },
  { path: '/api/progress_logs', file: './src/routes/progressRoutes', protected: true },
  { path: '/api/achievements', file: './src/routes/achievementsRoutes', protected: true },
  { path: '/api/calendar_entries', file: './src/routes/calendarRoutes', protected: true },
  { path: '/api/user_settings', file: './src/routes/settingsRoutes', protected: true },
  { path: '/api/user_profiles', file: './src/routes/userProfileRoutes', protected: true },
];

routes.forEach(({ path, file, protected: isProtected }) => {
  const routeHandler = require(file);
  if (isProtected) {
    app.use(path, checkJwt, routeHandler);
  } else {
    app.use(path, routeHandler);
  }
});

app.get('/', (req, res) => {
  res.send('🎉 HobbyHub REST API is running');
});

app.listen(port, () => {
  console.log(`Strežnik teče na http://localhost:${port}`);
  console.log('\nAvailable API routes:');
  console.log('   ➤ /api/login (public)');
  routes.forEach(({ path, protected: isProtected }) => {
    console.log(`   ➤ ${path} ${isProtected ? '(protected)' : '(public)'}`);
  });
});