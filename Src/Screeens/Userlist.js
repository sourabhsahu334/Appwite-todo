import {View, Text, TextInput, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utiles/GlobalStyles';
import {createTeam, listUsers, listTeams} from '../Services';
import {CustomButton} from '../components/CustomButton';
import {ID} from 'appwrite';

const Userlist = () => {
  const [userList, setUserList] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await listUsers();
      console.log(users);
      setUserList(users);
    };

    const fetchTeams = async () => {
      const fetchedTeams = await listUsers();
      console.log(fetchedTeams, 'te');
      setTeams(fetchedTeams?.teams);
    };

    // fetchUsers();
    fetchTeams();
  }, []);

  const creat = async () => {
    try {
      const data = await createTeam(ID.unique(), teamName, []);
      console.log(data);
      setTeams([...teams, data]); // Add the new team to the list of teams
    } catch (error) {
      console.log(error);
    }
  };

  const renderTeam = ({item}) => (
    <View style={styles.teamItem}>
      <Text style={styles.teamName}>{item.name}</Text>
      <Text style={styles.teamDescription}>
        {new Date(item.$createdAt).toLocaleDateString() +
          '   ' +
          new Date(item.$createdAt).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={[globalStyles.container2, {paddingVertical: 10}]}>
      <TextInput
        style={styles.input}
        placeholder="Enter Team Name"
        value={teamName}
        onChangeText={setTeamName}
      />

      <CustomButton text="Create" onPressfuntion={creat} marginTop={20} />
      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={item => item.$id}
        style={styles.teamList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  teamList: {
    marginTop: 20,
  },
  teamItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Userlist;
