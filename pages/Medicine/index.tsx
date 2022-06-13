import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FAB } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMedicine, usePet } from '../../hooks';
import styles from './styles';

export default function Medicine(props: any) {
  const [id, setId] = useState('');
  const [register, setRegister] = useState<boolean>(false);
  const [list, setList] = useState([]);

  const { selectedPet } = usePet();
  const { medicineList, medicineCreate, medicineRemove } = useMedicine();

  const add = async (name: string): Promise<void> => {
    if (!name || (selectedPet && !selectedPet.idpet)) {
      return Alert.alert(
        'Preenchimento invalido',
        'Nome do medicamento é obrigatório'
      );
    }
    const res = await medicineCreate(selectedPet.idpet, name);
    if (res && res.idmedicine) {
      name = name.trim();
      const date =
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear();
      const idmedicine = list.length + 1;
      const aux = [...list, { idmedicine, name, date }];
      setList(aux);
      setRegister(false);
    } else {
      Alert.alert('Erro', 'Não foi possivel registrar o medicamento');
    }
  };

  const remove = async (id: string): Promise<void> => {
    const res = await medicineRemove(id);
    if (res && res.idmedicine) {
      const aux = [...list];
      for (let i = 0; i < aux.length; i++) {
        if (aux[i].idmedicine == id) {
          aux.splice(i, 1);
          setList(aux);
          break;
        }
      }
    } else {
      Alert.alert('Erro', 'Não foi possivel remover o medicamento');
    }
  };

  useEffect(() => {
    if (selectedPet && selectedPet.idpet) {
      medicineList(selectedPet.idpet).then(res => setList(res));
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemtext}>
        <Text style={styles.itemname}>{item.name}</Text>
        <Text style={styles.itemname}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idmedicine)}
      >
        <MaterialCommunityIcons name="delete" color="#555" size={25} />
      </TouchableOpacity>
    </View>
  );

  return register ? (
    <Register
      lista={list}
      setLista={setList}
      setRegister={setRegister}
      add={add}
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.titlebox}>
        <Text style={styles.titletext}>{selectedPet.name || ''}</Text>
      </View>
      {list.length > 0 ? (
        <ScrollView style={styles.scroll}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.idmedicine}
          />
        </ScrollView>
      ) : (
        <Empty />
      )}
      <FAB
        style={styles.add}
        small
        color="white"
        icon="plus"
        onPress={() => setRegister(true)}
      />
    </View>
  );
}

function Empty() {
  return (
    <View style={styles.msg}>
      <Text style={styles.msgtext}>
        Clique no botão para cadastrar um medicamento
      </Text>
    </View>
  );
}

function Register(props: any) {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR MEDICAMENTO</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Nome do medicamento</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.add(name)}
          >
            <Text style={styles.buttonLabel}>salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.setRegister(false)}
          >
            <Text style={styles.buttonLabel}>voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
