import React, { createContext } from 'react';
import { Medicine } from '../models/Medicine';
import * as medicine from '../services/medicine';

interface MedicineContexProps {
  medicineList: (idpet: string) => Promise<Medicine[]>;
  medicineCreate: (idpet: string, name: string) => Promise<Medicine>;
  medicineRemove: (idmedicine: string) => Promise<Medicine>;
}

const MedicineContext = createContext({} as MedicineContexProps);

const MedicineProvider = ({ children }) => {
  async function medicineCreate(idpet: string, name: string) {
    return await medicine.medicineCreate(idpet, name);
  }

  async function medicineList(idpet: string) {
    return await medicine.medicineList(idpet);
  }

  async function medicineRemove(idmedicine: string) {
    return await medicine.medicineRemove(idmedicine);
  }

  return (
    <MedicineContext.Provider
      value={{
        medicineList,
        medicineCreate,
        medicineRemove
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};

export { MedicineContext, MedicineProvider };
