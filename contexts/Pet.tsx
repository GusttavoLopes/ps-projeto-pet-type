import React, { createContext, useState } from 'react';
import { Pet } from '../models/Pet';
import * as pet from '../services/pet';

interface PetContexProps {
  petList: () => Promise<Pet[]>;
  petCreate: (name: string) => Promise<Pet>;
  petRemove: (idPet: string) => Promise<Pet>;
  selectPet: (pet: Pet) => void;
  selectedPet: Pet;
}

const PetContext = createContext({} as PetContexProps);

const PetProvider = ({ children }) => {
  const [selectedPet, setSelectedPet] = useState({} as Pet);

  async function petCreate(name: string) {
    return await pet.petCreate(name);
  }

  async function petList() {
    return await pet.petList();
  }

  async function petRemove(idpet: string) {
    return await pet.petRemove(idpet);
  }

  function selectPet(pet: Pet) {
    setSelectedPet(pet);
  }

  return (
    <PetContext.Provider
      value={{
        petList,
        petCreate,
        petRemove,
        selectedPet,
        selectPet
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export { PetContext, PetProvider };
