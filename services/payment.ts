import { Payment } from '../models/Payment';
import api from './api';

async function paymentList(idpet: string): Promise<Payment[]> {
  try {
    const { data } = await api.post<{ payments: Payment[]; count: number }>(
      '/payment/list',
      { idpet }
    );
    return data.payments;
  } catch (e) {
    return e.message;
  }
}

async function paymentCreate(
  idpet: string,
  description: string,
  value: string
) {
  try {
    const { data } = await api.post('/payment/create', {
      idpet,
      description,
      value
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

async function paymentRemove(idpayment: string) {
  try {
    const { data } = await api.delete('/payment/remove', {
      data: { idpayment }
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

export { paymentList, paymentCreate, paymentRemove };
