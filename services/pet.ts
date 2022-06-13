import { Pet } from '../models/Pet';
import api from './api';

async function petList(): Promise<Pet[]> {
  try {
    const { data } = await api.get<{ pets: Pet[]; count: number }>('/pet/list');
    return data.pets;
  } catch (e) {
    return e.message;
  }
}

async function petCreate(name: string) {
  try {
    const { data } = await api.post('/pet/create', { name });
    return data;
  } catch (e) {
    return e.message;
  }
}

async function petRemove(idpet: string) {
  try {
    const { data } = await api.delete('/pet/remove', {
      data: { idpet: idpet }
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

async function paymentCreate(idpet: string, description: string, name: string) {
  try {
    const { data } = await api.post('/payment/create', {
      idpet,
      description,
      name
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

export { petList, petCreate, petRemove, paymentCreate };
