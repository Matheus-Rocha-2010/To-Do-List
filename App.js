
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('tarefas').then(dados => {
      if (dados) setTarefas(JSON.parse(dados));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (tarefa.trim() === '') return;

    setTarefas([...tarefas, {
      id: Date.now().toString(),
      nome: tarefa
    }]);

    setTarefa('');
  }

  function excluirTarefa(id) {
    setTarefas(tarefas.filter(item => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />

      <Button title="Adicionar tarefa" onPress={adicionarTarefa} />

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
            <Button
              title="Excluir"
              onPress={() => excluirTarefa(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
