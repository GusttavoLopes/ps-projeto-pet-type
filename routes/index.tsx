import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../hooks';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !token ? <AuthRoutes /> : <AppRoutes />;
}

const Loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFC125'
    }}
  >
    <ActivityIndicator size="large" color="#666" />
  </View>
);
