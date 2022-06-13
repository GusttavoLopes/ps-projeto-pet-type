import React, { createContext } from 'react';
import { Payment } from '../models/Payment';
import * as payment from '../services/payment';

interface PaymentContexProps {
  paymentList: (idpet: string) => Promise<Payment[]>;
  paymentCreate: (
    idpet: string,
    description: string,
    value: string
  ) => Promise<Payment>;
  paymentRemove: (idpayment: string) => Promise<Payment>;
}

const PaymentContext = createContext({} as PaymentContexProps);

const PaymentProvider = ({ children }) => {
  async function paymentCreate(
    idpet: string,
    description: string,
    value: string
  ) {
    return await payment.paymentCreate(idpet, description, value);
  }

  async function paymentList(idpet: string) {
    return await payment.paymentList(idpet);
  }

  async function paymentRemove(idPayment: string) {
    return await payment.paymentRemove(idPayment);
  }

  return (
    <PaymentContext.Provider
      value={{
        paymentList,
        paymentCreate,
        paymentRemove
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentContext, PaymentProvider };
