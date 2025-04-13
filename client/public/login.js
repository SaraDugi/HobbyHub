document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      // ✅ Store JWTs
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
  
      // ✅ Redirect to main app
      window.location.href = '/index.html';
    } catch (err) {
      document.getElementById('login-error').textContent = err.message;
      console.error('Login error:', err);
    }
  });  