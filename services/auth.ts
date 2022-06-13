import api from './api';

interface AuthResult {
  mail: string;
  token: string;
}

async function signIn(mail: string, password: string) {
  try {
    const { data } = await api.post<AuthResult>('/user/login', {
      mail,
      password
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

async function userCreate(mail: string, password: string) {
  try {
    const { data } = await api.post('/user/create', { mail, password });
    return data;
  } catch (e) {
    return e.message;
  }
}

export { signIn, userCreate };
