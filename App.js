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
/*
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
          name: 'employee_50.db',
          location: 'default',
          createFromLocation: '~employee_50.db'
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
        `SELECT * FROM employee
         WHERE first_name LIKE ? OR last_name LIKE ? OR workdept LIKE ? OR job LIKE ?
         OR phone_number LIKE ? OR email LIKE ?`,
        [likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery],
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

  const renderItem = ({ item }) => {

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
      <Text style={styles.empno}>ID: {item.empno}</Text>
      <Text style={styles.details}>Dept: {item.workdept}</Text>
      <Text style={styles.details}>Phone: {item.phone_number}</Text>
      <Text style={styles.details}>Job: {item.job}</Text>
      <Text style={styles.email}> {item.email}</Text>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.header}>Employee Directory</Text>
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
  empno: {
    fontSize:15,
    fontWeight:'bold',
    textAlign:'right',
  },
  details: {
    fontSize: 14,
  },
  email: {
    fontSize: 14,
    fontWeight:'bold',
    textAlign: 'right',
  },
  header: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'left',
  marginVertical: 16,
  color: '#333',
},
});

export default App;
*/
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const { width } = Dimensions.get('window');

const App = () => {
  const [db, setDb] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'employee_50.db',
          location: 'default',
          createFromLocation: '~employee_50.db'
        });
        setDb(database);
        await fetchEmployees(database, '');
      } catch (error) {
        console.error('DB Open Error:', error);
      } finally {
        setLoading(false);
      }
    };

    initDB();
  }, []);

  const fetchEmployees = async (database, query) => {
    return new Promise((resolve) => {
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
            sex LIKE ?
          ORDER BY empno ASC`,
          [likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery, likeQuery],
          (_, results) => {
            const rows = results.rows;
            const data = [];
            for (let i = 0; i < rows.length; i++) {
              data.push(rows.item(i));
            }
            setEmployees(data);
            resolve();
          },
          (_, error) => {
            console.error("Query Error:", error);
            resolve();
          }
        );
      });
    });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (db) {
      fetchEmployees(db, text);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (db) {
      await fetchEmployees(db, searchQuery);
    }
    setRefreshing(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (db) {
      fetchEmployees(db, '');
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={styles.itemContent}>
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.first_name) }]}>
          <Text style={styles.avatarText}>
            {getInitials(item.first_name, item.last_name)}
          </Text>
        </View>
        
        <View style={styles.employeeInfo}>
          <Text style={styles.name}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.job}>{item.job}</Text>
          
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dept:</Text>
              <Text style={styles.detailValue}>{item.workdept}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{item.phone_number}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.employeeNumber}>
          <Text style={styles.empNoText}>#{item.empno}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Employee Directory</Text>
      <Text style={styles.headerSubtitle}>
        {employees.length} employee{employees.length !== 1 ? 's' : ''} found
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery ? 'No employees found matching your search' : 'No employees available'}
      </Text>
      {searchQuery && (
        <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
          <Text style={styles.clearButtonText}>Clear Search</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading employees...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {renderHeader()}
      
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name, department, job..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.searchClearButton} onPress={clearSearch}>
            <Text style={styles.searchClearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={employees}
        keyExtractor={(item) => item.empno.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={true}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={employees.length === 0 ? styles.emptyList : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#1D1D1F',
  },
  searchClearButton: {
    position: 'absolute',
    right: 32,
    top: 28,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchClearText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  job: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    width: 50,
  },
  detailValue: {
    fontSize: 14,
    color: '#1D1D1F',
    flex: 1,
  },
  employeeNumber: {
    alignItems: 'flex-end',
  },
  empNoText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  clearButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;