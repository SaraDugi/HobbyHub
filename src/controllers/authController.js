const jwt = require('jsonwebtoken');
const db = require('../config/db');

let refreshTokens = [];

const generateTokens = (user) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m'
  });

  const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
  });

  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    if (password !== user.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id, username: user.username };
    const tokens = generateTokens(payload);
    res.json(tokens);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ error: 'Refresh token invalid' });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokens = generateTokens({ id: user.id, username: user.username });

    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    refreshTokens.push(tokens.refreshToken);

    res.json(tokens);
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

module.exports = { login, refresh };