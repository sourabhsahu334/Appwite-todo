import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLLECTION_ID,
  DATABASES_ID,
  database,
  getCurrentUser,
} from '../Services';
import {Databases, ID, Query} from 'appwrite';
import {RenderIcon} from '../components/RenderIcon';

const CreateTodo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState();
  const [id, setID] = useState();

  useEffect(() => {
    if (id) {
      fetchTodos();
    }
  }, [id]);

  useEffect(() => {
    const fethcuser = async () => {
      const data = await getCurrentUser();
      // console.log(data?.$id)
      setID(data?.$id);
    };
    fethcuser();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await database.listDocuments(
        DATABASES_ID,
        COLLECTION_ID,
        [Query.equal('id', id)],
      );
      console.log(response);
      setLoading(false);
      setTodos(response.documents);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await database.createDocument(
          DATABASES_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            id: id,
            title: newTodo,
            completed: false,
          },
        );
        setTodos([...todos, response]);
        setNewTodo('');
      } catch (error) {
        console.error(error);
      }
    }
  };
  const showAlert = (id, obj) => {
    Alert.alert(
      'Complete',
      'Mark complete task',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => toggleCompletion(id, obj),
        },
      ],
      {cancelable: true},
    );
  };

  const toggleCompletion = async (id, completed) => {
    setLoading(true);
    try {
      await database.updateDocument(DATABASES_ID, COLLECTION_ID, id, {
        completed: !completed,
      });
      setLoading(false);
      setTodos(
        todos.map(todo =>
          todo.$id === id ? {...todo, completed: !completed} : todo,
        ),
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      {/* {loading&&<View style={{height:"100%",width:"100%",backgroundColor:"rgba(0,0,0,.1)",position:"absolute",justifyContent:"center",alignItems:'center'}}> */}
      <View style={{backgroundColor: 'white'}}>
        {loading && <ActivityIndicator size={'large'} color={'black'} />}
      </View>
      {/* </View>} */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add Task" onPress={addTodo} />
        <FlatList
          data={todos}
          keyExtractor={item => item.$id}
          renderItem={({item}) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.todoTextCompleted,
                ]}>
                {item.title}
              </Text>
              <TouchableOpacity
                onPress={() => showAlert(item.$id, item.completed)}>
                {item?.completed ? (
                  <Image
                    source={require('../assets/right.png')}
                    style={{height: 40, width: 40}}
                  />
                ) : (
                  <RenderIcon
                    iconColor={'blue'}
                    iconName={'pending-actions'}
                    iconfrom={'MaterialIcons'}
                    iconSize={23}
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  todoItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 7,
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '99%',
    marginLeft: 1,
  },
  todoText: {
    fontSize: 18,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
export default CreateTodo;
