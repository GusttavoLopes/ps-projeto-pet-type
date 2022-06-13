import { useContext } from 'react';
import { PaymentContext } from '../contexts';

export default function usePayment() {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error(
      'hook usePayment está sendo chamado fora do PaymentProvider'
    );
  }

  return context;
}
