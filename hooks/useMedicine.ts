import { useContext } from 'react';
import { MedicineContext } from '../contexts';

export default function useMedicine() {
  const context = useContext(MedicineContext);

  if (!context) {
    throw new Error(
      'hook useMedicine está sendo chamado fora do MedicineProvider'
    );
  }

  return context;
}
