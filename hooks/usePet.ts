import { useContext } from 'react';
import { PetContext } from '../contexts';

export default function usePet() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error('hook usePet está sendo chamado fora do PetProvider');
  }

  return context;
}
