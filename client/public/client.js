const axios = require('axios');
const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, 
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config) => {
  if (jwtToken) {
    config.headers['Authorization'] = `Bearer ${jwtToken}`;
  }
  return config;
});

async function loginClient(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password
    });

    jwtToken = response.data.accessToken;
    console.log('Prijava uspešna, token:', jwtToken);
  } catch (error) {
    console.error('Napaka pri prijavi:', error.response?.data || error.message);
    throw error;
  }
}

function formatDateTime(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const handleResponse = (response) => {
  console.log('Odgovor:', response.data);
};

const handleError = (error) => {
  if (error.response) {
    console.error('Napaka (response):', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('Napaka (request): Ni bil prejet odgovor');
    if (error.request._currentUrl) {
      console.error('Zahteva poslana na:', error.request._currentUrl);
    }
  } else {
    console.error('Napaka:', error.message);
  }
};

const achievementAPI = {
  getAll: () => apiClient.get('/achievements').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/achievements/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/achievements', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/achievements/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/achievements/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/achievements/user/${userId}`).then(handleResponse).catch(handleError)
};

const calendarAPI = {
  getAll: () => apiClient.get('/calendar_entries').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/calendar_entries/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/calendar_entries', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/calendar_entries/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/calendar_entries/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/calendar_entries/user/${userId}`).then(handleResponse).catch(handleError),
  getByDateRange: (userId, startDate, endDate) =>
    apiClient.get('/calendar_entries/range/search', { params: { userId, startDate, endDate } })
      .then(handleResponse)
      .catch(handleError)
};

const progressAPI = {
  getAll: () => apiClient.get('/progress_logs').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/progress_logs/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/progress_logs', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/progress_logs/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/progress_logs/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/progress_logs/user/${userId}`).then(handleResponse).catch(handleError),
  getByTask: (taskId) => apiClient.get(`/progress_logs/task/${taskId}`).then(handleResponse).catch(handleError)
};

const userSettingsAPI = {
  getAll: () => apiClient.get('/user_settings').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/user_settings/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/user_settings', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/user_settings/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/user_settings/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/user_settings/user/${userId}`).then(handleResponse).catch(handleError)
};

const taskAPI = {
  getAll: () => apiClient.get('/tasks').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/tasks/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/tasks', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/tasks/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/tasks/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/tasks/user/${userId}`).then(handleResponse).catch(handleError)
};

const userProfileAPI = {
  getAll: () => apiClient.get('/user_profiles').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/user_profiles/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/user_profiles', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/user_profiles/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/user_profiles/${id}`).then(handleResponse).catch(handleError),
  getByUser: (userId) => apiClient.get(`/user_profiles/user/${userId}`).then(handleResponse).catch(handleError),
  getDefaultProfile: (userId) => apiClient.get(`/user_profiles/user/${userId}/default`).then(handleResponse).catch(handleError)
};

const userAPI = {
  getAll: () => apiClient.get('/users').then(handleResponse).catch(handleError),
  getById: (id) => apiClient.get(`/users/${id}`).then(handleResponse).catch(handleError),
  create: (data) => apiClient.post('/users', data).then(handleResponse).catch(handleError),
  update: (id, data) => apiClient.put(`/users/${id}`, data).then(handleResponse).catch(handleError),
  remove: (id) => apiClient.delete(`/users/${id}`).then(handleResponse).catch(handleError)
};

async function testClient() {
  try {
    await loginClient('sara', 'saradugi11');

    // Achievement klici
    await achievementAPI.getAll();
    await achievementAPI.getById(2);
    await achievementAPI.create({
      user_id: 2,
      points: 100,
      badge_name: 'New Achievement',
      level: 1,
      date_awarded: formatDateTime(new Date())
    });
    await achievementAPI.update(1, {
      user_id: 1,
      points: 150,
      badge_name: 'Updated Achievement',
      level: 2,
      date_awarded: formatDateTime(new Date())
    });
    await achievementAPI.remove(1);
    await achievementAPI.getByUser(2);

    // Calendar klici
    await calendarAPI.getAll();
    await calendarAPI.getById(2);
    await calendarAPI.create({
      user_id: 2,
      title: 'Sestanek s stranko',
      description: 'Poslovni sestanek',
      category: 'delo',
      priority: 'visoka',
      start_time: formatDateTime('2025-03-27T08:00:00'),
      end_time: formatDateTime('2025-03-27T09:00:00'),
      notes: 'Pripraviti poročilo'
    });
    await calendarAPI.update(1, {
      user_id: 1,
      title: 'Posodobljen sestanek',
      description: 'Poslovni sestanek - posodobljen',
      category: 'delo',
      priority: 'visoka',
      start_time: formatDateTime('2025-03-27T08:30:00'),
      end_time: formatDateTime('2025-03-27T09:30:00'),
      notes: 'Pripraviti novo poročilo'
    });
    await calendarAPI.remove(1);
    await calendarAPI.getByUser(2);
    await calendarAPI.getByDateRange(2, '2025-04-01', '2025-04-30');

    // Progress klici
    await progressAPI.getAll();
    await progressAPI.getById(2);
    await progressAPI.create({
      user_id: 2,
      task_id: 2,
      date_logged: formatDate('2025-03-25T23:00:00'),
      duration_minutes: 60,
      completion_percentage: 50,
      comment: 'Poročilo končano'
    });
    await progressAPI.update(1, {
      user_id: 1,
      task_id: 1,
      date_logged: formatDate('2025-03-25T23:00:00'),
      duration_minutes: 60,
      completion_percentage: 75,
      comment: 'Poročilo posodobljeno'
    });
    await progressAPI.remove(1);
    await progressAPI.getByUser(2);
    await progressAPI.getByTask(2);

    // User Settings klici
    await userSettingsAPI.getAll();
    await userSettingsAPI.getById(2);
    await userSettingsAPI.create({
      user_id: 2,
      theme_color: 'dark',
      font_preference: 'Arial',
      layout_style: 'compact',
      show_modules: JSON.stringify({ tasks: true, calendar: true, progress: false })
    });
    await userSettingsAPI.update(1, {
      user_id: 2,
      theme_color: 'light',
      font_preference: 'Arial',
      layout_style: 'compact',
      show_modules: JSON.stringify({ tasks: true, calendar: true, progress: true })
    });
    await userSettingsAPI.remove(1);
    await userSettingsAPI.getByUser(2);

    // Task klici
    await taskAPI.getAll();
    await taskAPI.getById(2);
    await taskAPI.create({
      user_id: 2,
      title: 'Oddaja poročila',
      description: 'Končati poročilo za stranko',
      due_date: formatDate('2025-03-29T23:00:00'),
      priority: 'visoka',
      category: 'delo',
      reminder_email: 1,
      reminder_sms: 0,
      completed: 0
    });
    await taskAPI.update(1, {
      user_id: 2,
      title: 'Oddaja poročila - posodobljeno',
      description: 'Posodobljeno poročilo',
      due_date: formatDate('2025-03-29T23:00:00'),
      priority: 'visoka',
      category: 'delo',
      reminder_email: 1,
      reminder_sms: 0,
      completed: 1
    });
    await taskAPI.remove(1);
    await taskAPI.getByUser(2);
    await userProfileAPI.getAll();
    await userProfileAPI.getById(11);
    await userProfileAPI.create({
      user_id: 5,
      profile_name: 'Osnovni profil',
      settings: JSON.stringify({ bio: 'Pozdravljen svet!' })
    });
    await userProfileAPI.update(1, {
      user_id: 5,
      profile_name: 'Posodobljen profil',
      settings: JSON.stringify({ bio: 'Posodobljen opis' })
    });
    await userProfileAPI.remove(1);
    await userProfileAPI.getByUser(1);
    await userProfileAPI.getDefaultProfile(1);
    const randomNumber = Math.floor(Math.random() * 1000000);
    const randomUsername = `user${randomNumber}`;
    const randomEmail = `${randomUsername}@example.com`;
    await userAPI.getAll();
    await userAPI.getById(2);
    await userAPI.create({
      username: randomUsername,
      email: randomEmail,
      password_hash: 'secretHash'
    });
    await userAPI.update(1, {
      username: 'updateduser',
      email: 'updateduser@example.com',
      password_hash: 'updatedHash'
    });
    await userAPI.remove(1);
  } catch (error) {
    console.error('Test Client Error:', error);
  }
}

testClient();