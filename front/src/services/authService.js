// src/services/authService.js
import axios from 'axios';
const API_URL = 'http://localhost:8000'; // ajuste se necessário

export async function login(username, password) {
  const response = await axios.post(`${API_URL}/api/token/`, { username, password });
  localStorage.setItem('access', response.data.access);
  localStorage.setItem('refresh', response.data.refresh);
  return response.data;
}

export function logout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
}