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
import { usePayment, usePet } from '../../hooks';
import styles from './styles';

export default function Payment(props: any) {
  const [register, setRegister] = useState<boolean>(false);
  const [list, setList] = useState([]);

  const { selectedPet } = usePet();
  const { paymentList, paymentCreate, paymentRemove } = usePayment();

  const add = async (description: string, value: number): Promise<void> => {
    if (!description || !value || (selectedPet && !selectedPet.idpet)) {
      return Alert.alert(
        'Preenchimento invalido',
        'Por favor, preencha todos os campos'
      );
    }
    const res = await paymentCreate(selectedPet.idpet, description, value);
    if (res && res.idpayment) {
      description = description.trim();
      const date =
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear();
      const idpayment = list.length + 1;
      const aux = [...list, { idpayment, description, value, date }];
      setList(aux);
      setRegister(false);
    } else {
      Alert.alert('Erro', 'Não foi possivel registrar o pagamento');
    }
  };

  const remove = async (id: string): Promise<void> => {
    const res = await paymentRemove(id);
    if (res && res.idpayment) {
      const aux = [...list];
      for (let i = 0; i < aux.length; i++) {
        if (aux[i].idpayment == id) {
          aux.splice(i, 1);
          setList(aux);
          break;
        }
      }
    } else {
      Alert.alert('Erro', 'Não foi possivel remover o pagamento');
    }
  };

  useEffect(() => {
    if (selectedPet && selectedPet.idpet) {
      paymentList(selectedPet.idpet).then(res => setList(res));
    }
  }, [selectedPet]);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemtext}>
        <Text style={styles.itemname}>{item.description}</Text>
        <Text style={styles.itemname}>
          R${item.value} - {item.date}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idpayment)}
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
        <Text style={styles.titletext}>{selectedPet && selectedPet.name}</Text>
      </View>
      {list.length > 0 ? (
        <ScrollView style={styles.scroll}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.idpayment}
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
        Clique no botão para cadastrar um pagamento
      </Text>
    </View>
  );
}

function Register(props: any) {
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<string>('');

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR GASTO</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            autoCapitalize="words"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            keyboardType="decimal-pad"
          />
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.add(description, value)}
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
