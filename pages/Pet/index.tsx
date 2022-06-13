import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FAB } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth, useBackHandler, usePet } from '../../hooks';
import styles from './styles';

export default function Pet(props: any) {
  const [register, setRegister] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  // o hook useAuth substitui o uso do AuthContext
  const { signOut } = useAuth();
  const { petList, petCreate, petRemove, selectedPet, selectPet } = usePet();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function list(): Promise<void> {
      setLoading(true);
      const response = await petList();
      if (response) {
        setList(response);
        if (response.length > 0) selectPet(response[0]);
      }
      setLoading(false);
    }
    list();
  }, []);

  useBackHandler(() => {
    // verifica se está na tela Pet (tela atual)
    if (props.navigation.isFocused()) {
      exit();
    } else {
      props.navigation?.goBack();
    }
    return true;
  });

  const exit = () => {
    Alert.alert(null, 'Deseja encerrar o aplicativo?', [
      { text: 'sim', onPress: () => signOut() },
      { text: 'não', onPress: () => null, style: 'cancel' }
    ]);
  };

  const add = async (name: string): Promise<void> => {
    name = name.trim();
    if (name) {
      setLoading(true);
      const response = await petCreate(name);
      if (response?.idpet) {
        const aux = [...list, response];
        setList(aux);
        selectPet(response);
        setRegister(false);
      } else Alert.alert(response.error || 'Problemas para cadastrar o pet');
      setLoading(false);
    } else Alert.alert('Forneça o nome do pet');
  };

  const remove = async (idpet: string, name: string): Promise<void> => {
    Alert.alert(null, `Excluir definitivamente o pet ${name}?`, [
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          const response = await petRemove(idpet);
          if (response.idpet) {
            const aux = [...list];
            for (let i = 0; i < aux.length; i++) {
              if (aux[i].idpet == idpet) {
                aux.splice(i, 1);
                setList(aux);
                if (idpet == selectPet && aux.length > 0) selectPet(aux[0]);
                break;
              }
            }
          } else
            Alert.alert(response.error || 'Problemas para cadastrar o pet');
          setLoading(false);
        }
      },
      {
        text: 'Não'
      }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemtext} onPress={() => selectPet(item)}>
        <Text
          style={[
            styles.itemname,
            selectedPet &&
              selectedPet.idpet == item.idpet && { fontWeight: 'bold' }
          ]}
        >
          {item.name}
        </Text>
        {item && selectedPet.idpet == item.idpet && (
          <Entypo
            name="check"
            color="#555"
            size={25}
            style={styles.itemcheck}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.remove}
        onPress={() => remove(item.idpet, item.name)}
      >
        <MaterialCommunityIcons name="delete" color="#555" size={25} />
      </TouchableOpacity>
    </View>
  );

  return loading ? (
    <Loading />
  ) : register ? (
    <Register
      lista={list}
      setLista={setList}
      setRegister={setRegister}
      add={add}
    />
  ) : (
    <View style={styles.container}>
      {list.length > 0 ? (
        <ScrollView style={styles.scroll}>
          <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.idpet}
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
      <FAB
        style={styles.exit}
        small
        color="white"
        icon="exit-to-app"
        onPress={() => exit()}
      />
    </View>
  );
}

function Empty() {
  return (
    <View style={styles.msg}>
      <Text style={styles.msgtext}>
        Clique no botão para cadastrar o seu pet
      </Text>
    </View>
  );
}

function Register(props: any) {
  const [name, setName] = useState<string>('');

  return (
    <View style={styles.registercontainer}>
      <View style={styles.box}>
        <Text style={styles.title}>CADASTRAR PET</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>Nome do pet</Text>
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

const Loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFC125'
    }}
  >
    <ActivityIndicator size="large" color="#666" />
  </View>
);
