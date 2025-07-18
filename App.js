/* import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView, Platform, StatusBar,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Enable debug (optional)
SQLite.enablePromise(true);
SQLite.DEBUG(true);

const App = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const db = await SQLite.openDatabase({
          name: 'employee.db',
          location: 'default',
          createFromLocation: '~employee.db',  // crucial for preloaded DBs
        });

        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM employee',
            [],
            (_, results) => {
              const rows = results.rows;
              let data = [];

              for (let i = 0; i < rows.length; i++) {
                data.push(rows.item(i));
              }

              setEmployees(data);
            },
            error => {
              console.error("Error fetching data:", error);
            }
          );
        });
      } catch (e) {
        console.error("DB Error:", e);
      }
    };

    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.details}>Dept: {item.workdept}</Text>
      <Text style={styles.details}>Phone: {item.phone_number}</Text>
      <Text style={styles.details}>Job: {item.job}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={employees}
        keyExtractor={item => item.empno.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10,
    backgroundColor: '#fff',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default App;
*/
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, SafeAreaView, StatusBar, Platform
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const App = () => {
  const [db, setDb] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'employee.db',
          location: 'default',
          createFromLocation: '~employee.db'
        });
        setDb(database);
        fetchEmployees(database, '');
      } catch (error) {
        console.error('DB Open Error:', error);
      }
    };

    initDB();
  }, []);

  const fetchEmployees = (database, query) => {
    const likeQuery = `%${query}%`;
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM employee WHERE 
          first_name LIKE ? OR 
          last_name LIKE ? OR 
          workdept LIKE ? OR 
          phone_number LIKE ? OR 
          job LIKE ? OR 
          hiredate LIKE ? OR 
          sex LIKE ?`,
        [likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery],
        (_, results) => {
          const rows = results.rows;
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setEmployees(data);
        },
        (_, error) => {
          console.error("Query Error:", error);
        }
      );
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (db) {
      fetchEmployees(db, text);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.details}>Dept: {item.workdept}</Text>
      <Text style={styles.details}>Phone: {item.phone_number}</Text>
      <Text style={styles.details}>Job: {item.job}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search employees..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={employees}
        keyExtractor={(item) => item.empno.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
  },
});

export default App;
