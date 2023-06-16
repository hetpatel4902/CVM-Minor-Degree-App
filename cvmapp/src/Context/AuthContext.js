import {View, Text} from 'react-native';
import React, {useEffect, useState, createContext, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AppLoader from '../../components/AppLoader';
// import SearchLoader from '../../components/SearchLoader';
import {USER_IP} from '@env';
// import axios from 'axios';

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
  const [dbUser, setDbUser] = useState(null);
  const [user, setUser] = useState(false);
  const [tokens, setTokens] = useState(null);
  const [users, setUsers] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loginPending, setLoginPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trying, setTrying] = useState(3);

  const [choice1, setChoice1] = useState(null);
  let jsonValue;
  useEffect(() => {
    getData();
  }, []);
  // let trying = 3;
  const getData = async () => {
    setLoginPending(true);
    const value = await AsyncStorage.getItem('userDetail');
    jsonValue = JSON.parse(value);
    if (value != null) {
      console.log('user in auth context:', jsonValue);
      setUser(true);
      setUsers(jsonValue?.userID);
      setTokens(jsonValue?.token);
      setName(jsonValue?.name);
      setDbUser(jsonValue);
    } else {
      setUser(false);
    }
    setLoginPending(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        dbUser,
        tokens,
        users,
        setTokens,
        jsonValue,
        getData,
        loginPending,
        setLoginPending,
        name,
        setName,
        setUserId,
        userId,
        loading,
        setLoading,
        trying,
        setTrying,
        choice1,
        setChoice1,
      }}>
      {children}
      {loginPending ? <AppLoader /> : null}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
