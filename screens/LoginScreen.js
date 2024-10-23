import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import {login} from '../api/auth';
import {Context} from '../context/Store';
import {storeUserDataAsync} from '../helper';
import LogoBlue from '../assets/logo/logo_blue.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const {
    state: {userData},
    dispatch,
  } = useContext(Context);
  console.log(userData);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('userData', value);
    } catch (e) {
      // saving error
    }
  };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userData');
  //     console.log(jsonValue, 'userData+++=====');
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.log(e, 'error+++=====');

  //     // error reading value
  //   }
  // };

  // useEffect(()=> {
  //   storeData("Wazeer Ahamed")
  //   getData()
  // }, [])

  const handleLogin = async () => {
    // Implement your login logic here
    if (username.length > 3 && password.length > 3) {
      const res = await login(username, password);
      console.log(res);
      console.log(res, '___________hello');
      console.log(res);
      if (res.data.app_data.StatusCode === 6000) {
        console.log('___hello_____', res.data.app_data, 'wazeer ahmed');

        const userData = {
          access: res.data.app_data.data.access.access,
          refresh: res.data.app_data.data.access.refresh,
          isVerified: true,
        };

        dispatch({type: 'UPDATE_USER_DATA', payload: userData});
        await storeUserDataAsync(userData);
        navigation.navigate('Private');
      } else {
        console.log(res, '____Response___');
        console.log(res.data.app_data, '__________________');
        Alert.alert('Validation Error', [{text: 'OK'}], {cancelable: false});
      }
    } else {
      Alert.alert(
        'Validation Error',
        'Username and password required',
        [{text: 'OK'}],
        {cancelable: false},
      );
      setError(true);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.MainContaine}>
        <View style={styles.TopCover}>
          <View style={styles.OuterCircle}>
            <View style={styles.InnerCircle}>
              <Image source={LogoBlue} style={styles.LogoImage} />
            </View>
          </View>
        </View>
        <View style={styles.ContainerWhite}>
          <Text style={styles.Heading}>Login to Your Account</Text>
          <Text style={styles.SubHead}>
            Login with the credentials provided from the society.
          </Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="gray"
              secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  Heading: {
    fontSize: 30,
    // fontWeight:700,
    color: '#191919',
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    color: '#000',
  },
  ContainerWhite: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 40,
    position: 'absolute',
    bottom: 0,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#56C9DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  TopCover: {
    paddingVertical: 70,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  OuterCircle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: '#CEECF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InnerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 10,
    borderColor: '#53C6DA29',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubHead: {
    fontSize: 18,
    textAlign: 'center',
    width: '70%',
    color: '#ADADAD',
  },
  MainContaine: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#F3F8F9',
  },
  LogoImage: {
    width: '60%',
    objectFit: 'contain',
  },
});

export default LoginScreen;
