const express = require('express');
const path = require('path');
require('dotenv').config();
const webPush = require('web-push');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from /client/public BEFORE any route handling
app.use(express.static(path.join(__dirname, 'client', 'public')));

const checkJwt = require('./src/middleware/auth');
const authRoutes = require('./src/routes/authRoutes');

// Auth routes (e.g., login/signup, etc.)
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

const subscriptions = [];

webPush.setVapidDetails(
  'mailto:admin@hobbyhub.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscription stored.' });
});

app.post('/notify', (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  const results = subscriptions.map(sub =>
    webPush.sendNotification(sub, payload).catch(err => {
      console.error('Push error:', err);
    })
  );

  Promise.all(results)
    .then(() => res.status(200).json({ message: 'Notifications sent.' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// The /login.html route is now superfluous because login.html is served statically,
// but you may keep it if needed:
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'login.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`\n🚀 Strežnik teče na: http://localhost:${port}`);
  console.log('📁 Statika: /client/public');
  console.log('🔐 Zaščiteni API-ji:');
  routes.forEach(({ path }) => console.log(`   ➤ ${path}`));
  console.log('🔔 Potisna obvestila:');
  console.log('   ➤ POST /subscribe');
  console.log('   ➤ POST /notify\n');
});
