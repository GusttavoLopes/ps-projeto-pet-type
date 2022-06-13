import { Medicine } from '../models/Medicine';
import api from './api';

async function medicineList(idpet: string): Promise<Medicine[]> {
  try {
    const { data } = await api.post<{ medicines: Medicine[]; count: number }>(
      '/medicine/list',
      { idpet }
    );
    return data.medicines;
  } catch (e) {
    return e.message;
  }
}

async function medicineCreate(idpet: string, name: string) {
  try {
    const { data } = await api.post('/medicine/create', { idpet, name });
    return data;
  } catch (e) {
    return e.message;
  }
}

async function medicineRemove(idmedicine: string) {
  try {
    const { data } = await api.delete('/medicine/remove', {
      data: { idmedicine: idmedicine }
    });
    return data;
  } catch (e) {
    return e.message;
  }
}

export { medicineList, medicineCreate, medicineRemove };
