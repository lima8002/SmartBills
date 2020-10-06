import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack'

// firebase
// config
import {firebaseConfig} from './config/firebase'
// library
import * as firebase from 'firebase'
// initialize app
if ( !firebase.apps.length ){ 
  firebase.initializeApp(firebaseConfig)
}

import { HomeScreen } from './components/HomeScreen'
import { DetailScreen } from './components/DetailScreen'
import { LoginScreen } from './components/LoginScreen'
import { AddScreen } from './components/AddScreen'

export default function App() {
 
  const [auth,setAuth] = useState(false)
  const [dataRef, setDataRef] = useState(null)
  const [lsData, setLsData] = useState(null)

  let listData = []
  let data = []

  useEffect(() => {
    // get user's items
    readData()
   })
 
  // register or login user
  const doRegister = (email,password) => {
    firebase.auth().createUserWithEmailAndPassword( email, password )
    .catch( error => createAlert(error) )
  }
  // register or login user
  const doLogin = (email,password) => {
    firebase.auth().signInWithEmailAndPassword( email, password )
    .catch( error => createAlert(error) )
  }
  // listen for auth changes
  firebase.auth().onAuthStateChanged( (user) => {
    if( user ) {
      setAuth(true)
      setDataRef(`users/${user.uid}`)
    }
    else {
      setAuth(false)
      setDataRef(null)
    }
  } )

  // logout 
  const doLogoutAcc = () => {
    setAuth(false)
    firebase.auth().signOut()
  }

  // add Data to firebase
  const addData = (item) => {
    if( !dataRef ) {
      return
    }
    const dataObj = { 
      description: item.description,
      date: item.date,
      amount: item.amount
    }
    firebase.database().ref(`${dataRef}/items/${item.id}`).set(dataObj)
  }

  // read data from DB
  const readData = () => {
    if(!dataRef) {
      return
    }
    firebase.database().ref(`${dataRef}/items`).once('value')
    .then((snapshot) => {
      data = snapshot.val()
      if(data) {
        let keys = Object.keys(data)
        listData = []
        keys.forEach((key) => {
          let item = data[key]
          item.id = key
          listData.push(item)
        })   
        }
        setLsData(listData)
    })   
  }

  const updateData = (item) => {
    const data = {amount: item.amount,date: item.date, description: item.description }
    firebase.database().ref(`${dataRef}/items/${item.id}`).update( data )
  }

  const deleteData = (id) => {
    firebase.database().ref(`${dataRef}/items/${id}`).remove()
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Login' >
        {(props) => <LoginScreen {...props} 
            loggedIn={auth}
            registerAcc={doRegister}
            loginAcc={doLogin}
        />}
      </Stack.Screen>
      <Stack.Screen name='Home' > 
        {(props) => <HomeScreen {...props} 
            data={lsData}
            extraData={lsData}
            logoutAcc={doLogoutAcc}      
                  
        />}
      </Stack.Screen>
      <Stack.Screen name='Detail' >
        {(props) => <DetailScreen {...props} 
            update={updateData}
            delete={deleteData}
        />}
      </Stack.Screen>
      <Stack.Screen name='Add'  >
        {(props) => <AddScreen {...props} 
            add={addData}
            
        />}
      </Stack.Screen>
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
const createAlert = (error) =>
    Alert.alert(
      "Error",
      error.message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


const Stack = createStackNavigator()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
