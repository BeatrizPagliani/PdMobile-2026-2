import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_ID = 'TusjhJKZP9dpYmBQiP0CA41sllUsNwD3sxWdjTxv';
const REST_KEY = 'PZhKCLyxaG1Hjx6rPD8TUwJAm3opPn0XEjfw8eyz';
const BASE_URL = 'https://parseapi.back4app.com';

const headersBase = {
  'X-Parse-Application-Id': APP_ID,
  'X-Parse-REST-API-Key': REST_KEY,
  'Content-Type': 'application/json',
};

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }
  return data;
}

export async function cadastrar({ username, email, password }) {
  const data = await request('/users', {
    method: 'POST',
    headers: headersBase,
    body: JSON.stringify({ username, email, password }),
  });
  await AsyncStorage.setItem('sessionToken', data.sessionToken);
  return data;
}

export async function login({ username, password }) {
  const query = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
  const data = await request(`/login?${query}`, {
    method: 'GET',
    headers: headersBase,
  });
  await AsyncStorage.setItem('sessionToken', data.sessionToken);
  return data;
}

export async function usuarioLogado() {
  const token = await AsyncStorage.getItem('sessionToken');
  if (!token) return null;
  return request('/users/me', {
    method: 'GET',
    headers: { ...headersBase, 'X-Parse-Session-Token': token },
  });
}

export async function logout() {
  const token = await AsyncStorage.getItem('sessionToken');
  try {
    if (token) {
      await request('/logout', {
        method: 'POST',
        headers: { ...headersBase, 'X-Parse-Session-Token': token },
      });
    }
  } catch (e) {}
  await AsyncStorage.removeItem('sessionToken');
}