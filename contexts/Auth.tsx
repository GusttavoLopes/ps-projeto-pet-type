import * as SecureStore from 'expo-secure-store';
import React, { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as auth from '../services/auth';
import api from '../services/api';

interface AuthContextProps {
  signIn: (mail: string, password: string) => Promise<any>;
  signOut: () => void;
  token: string;
  mail: string;
  loading: boolean;
  userCreate: (mail: string, password: string) => Promise<any>;
}

const AuthContext = createContext({} as AuthContextProps);

// extrai o children em <AuthProdiver> children </AuthProvider>
// no children estarão as rotas definidas por Navigator e Screen
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(true);

  // o useEffect que vai ser disparado assim que o AuthProvider for construído em tela
  useEffect(() => {
    async function loadStorageData() {
      const storagedToken = await SecureStore.getItemAsync('token');
      const storagedMail = await SecureStore.getItemAsync('mail');

      if (storagedToken && storagedMail) {
        api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
        setMail(storagedMail);
        setToken(storagedToken);
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn(mail: string, password: string) {
    const response = await auth.signIn(mail, password);

    if (response?.token && response?.mail) {
      api.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      await SecureStore.setItemAsync('token', response.token);
      await SecureStore.setItemAsync('mail', response.mail);
      setToken(response.token);
      setMail(response.mail);
    } else {
      Alert.alert(response.error || 'Problemas ao executar a operação');
    }
  }

  async function signOut() {
    api.defaults.headers.common.Authorization = '';
    setToken(null);
    setMail(null);
    SecureStore.deleteItemAsync('token');
    SecureStore.deleteItemAsync('mail');
  }

  async function userCreate(mail: string, password: string) {
    const response = await auth.userCreate(mail, password);
    if (response.token && response.mail) {
      api.defaults.headers.common.Authorization = `Bearer ${response.token}`;
      await SecureStore.setItemAsync('token', response.token);
      await SecureStore.setItemAsync('mail', response.mail);
      setToken(response.token);
      setMail(response.mail);
    } else {
      Alert.alert(response.error || 'Problemas ao executar a operação');
    }
  }
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token,
        mail,
        loading,
        userCreate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
