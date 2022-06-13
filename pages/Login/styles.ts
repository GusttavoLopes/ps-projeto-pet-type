import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFC125'
  },
  box: {
    padding: 10,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5
  },
  title: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  label: {
    color: '#333',
    marginBottom: 5,
    width: '100%',
    fontSize: 12
  },
  input: {
    color: '#444',
    width: 250,
    borderWidth: 1,
    padding: 5,
    borderColor: '#555',
    borderRadius: 2,
    fontSize: 16
  },
  boxButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: 100,
    paddingVertical: 5,
    borderColor: '#111',
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 5
  },
  buttonLabel: {
    color: '#FFC125',
    fontSize: 15,
    textAlign: 'center'
  }
});
