import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState } from 'react';
import { estiloTextos } from './misEstilos';

export default function App() {

  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [contador, setContador] = useState(0);
  const [listaNombres, setListaNombres] = useState([]);

  const mostrarMensaje = () => {
    if (nombre.trim() === '') {
      setMensaje('Por favor escribe tu nombre antes de continuar.');
    } else {
      setMensaje(`Hola, ${nombre.trim()}!`);
    }
  };

  const agregarNombre = () => {
    const nombreTrimmed = nombre.trim();
    if (nombreTrimmed === '') {
      setMensaje('Escribe un nombre para poder agregarlo.');
      return;
    }
    if (listaNombres.includes(nombreTrimmed)) {
      setMensaje(`'${nombreTrimmed}' ya existe en la lista.`);
      return;
    }
    setListaNombres([...listaNombres, nombreTrimmed]);
    setNombre('');
    setMensaje(`'${nombreTrimmed}' fue agregado a la lista.`);
  };

  const limpiarCampos = () => {
    setNombre('');
    setMensaje('');
    setContador(0);
    setListaNombres([]);
  };

  const incrementarContador = () => {
    setContador(contador + 1);
  };

  const handleDeleteConfirmation = (nombreParaBorrar) => {
    Alert.alert(
      'Eliminar Nombre',
      `¿Estás seguro de que quieres eliminar a "${nombreParaBorrar}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            setListaNombres(prevNombres => prevNombres.filter(nombre => nombre !== nombreParaBorrar));
            setMensaje(`'${nombreParaBorrar}' fue eliminado de la lista.`);
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const emoji =
    nombre.trim().length === 0 ? '🙂' :
    nombre.trim().length < 5 ? '😄' :
    nombre.trim().length < 8 ? '😃' :
    nombre.trim().length < 15 ? '😁' :
    '🤩';

  return (
    <View style={styles.container}>
      <Text style={estiloTextos.texto}>Escribe tu nombre:</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu nombre aquí"
        placeholderTextColor="#b8b8b8"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.contador}>Caracteres: {nombre.trim().length}</Text>

      <Text style={styles.emoji}>{emoji}</Text>


      <View style={styles.botones}>
        <TouchableOpacity style={styles.btnPrimario} onPress={mostrarMensaje}>
          <Text style={styles.btnTexto}>Mostrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnCuaternario} onPress={agregarNombre}>
          <Text style={styles.btnTexto}>Agregar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecundario} onPress={limpiarCampos}>
          <Text style={styles.btnTexto}>Limpiar</Text>
        </TouchableOpacity>
      </View>


      <Text style={styles.mensaje}>{mensaje}</Text>

      <View style={styles.contadorBtnContainer}>
        <TouchableOpacity style={styles.btnTerciario} onPress={incrementarContador}>
          <Text style={styles.btnTexto}>Contador</Text>
        </TouchableOpacity>
        <Text style={styles.contadorTexto}>{contador}</Text>
      </View>

      <FlatList
        style={styles.lista}
        data={listaNombres}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleDeleteConfirmation(item)}>
            <Text style={styles.listaItem}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => (
          listaNombres.length > 0 && <Text style={styles.listaTitulo}>Nombres agregados:</Text>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50, // Add padding top to avoid overlap with status bar
  },
  input: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botones: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 15,
  },
  btnPrimario: {
    backgroundColor: '#A5DEE5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnSecundario: {
    backgroundColor: '#FBC4AB',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnTerciario: {
    backgroundColor: '#C5E1A5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnCuaternario: {
    backgroundColor: '#D8BFD8',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  btnTexto: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  mensaje: {
    color: '#333',
    fontSize: 18,
    marginTop: 15,
    textAlign: 'center',
    height: 40, // Give it a fixed height to avoid layout jumps
  },
  contador: {
    color: '#7A7A7A',
    fontSize: 14,
  },
  emoji: {
    fontSize: 40,
    marginVertical:5,
  },
  contadorBtnContainer: {
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  contadorTexto: {
    color: '#333',
    fontSize: 16,
  },
  lista: {
    width: '90%',
    marginTop: 10,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  listaItem: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#555',
  }
});
