import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const LoginScreen = (props) => {

    const [login, setLogin] = useState(false)
    // hooks for validation
    const [validEmail,setValidEmail] = useState(false)
    const [validPassword,setValidPassword] = useState(false)
    // hooks for user credentials
    const [email,setEmail] = useState(null)
    const [password, setPassword ] = useState(null)

    const navigation = useNavigation()

    useEffect(() => {
        if (props.loggedIn) {
            navigation.reset({
                index:0,
                routes: [{ name: 'Home' }]
            })
        } 
    })

    const validateEmail = (email) => {
        if( email.indexOf('@') > 0 && email.indexOf('.') > 0 ) {
          setValidEmail( true )
          setEmail( email )
        }
        else {
          setValidEmail( false )
        }
    }

    const validatePassword = (password) => {
        if( password.length >= 8 ) {
          setValidPassword( true )
          setPassword(password)
        }
        else {
          setValidPassword( false )
        }
      }

    if (!login) {
        // login / register view
        return (
            <SafeAreaView style={LoginStyles.container}>
                <Text style={LoginStyles.textTitle}>Smart Bills</Text>

                <Text>Username:</Text>
                <TextInput 
                    style={LoginStyles.input} 
                    placeholder='you@email.com'
                    onChangeText={ (email) => validateEmail(email) }
                />
                <Text>Password:</Text>
                <TextInput 
                    style={LoginStyles.input} 
                    placeholder='your password' 
                    secureTextEntry={true}
                    onChangeText={ (password) => validatePassword(password) }
                />
                <View style={LoginStyles.icons}>
                    <Text style={LoginStyles.textSubTitle}>Welcome back!</Text>
                    <Text style={LoginStyles.textSubTitle}>New around here?</Text>
                </View>
                <View style={LoginStyles.icons}>
                    <TouchableOpacity style={ !validEmail || !validPassword ? LoginStyles.buttonDisabled : LoginStyles.button }
                        disabled={ !validEmail || !validPassword ? true : false }
                         onPress={ () => props.loginAcc(email, password)}>
                        <Text style={LoginStyles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ !validEmail || !validPassword ? LoginStyles.buttonDisabled : LoginStyles.button }
                        disabled={ !validEmail || !validPassword ? true : false }
                         onPress={ () => props.registerAcc(email, password)}>
                        <Text style={LoginStyles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        margin:10
    },
    textTitle:{
        marginVertical:20,
        fontSize:36,
        marginBottom: 110
    },
    input: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginVertical: 15,
    },
    icons:{
        marginTop:8,
        flexDirection:'row',
        justifyContent:'space-around', 
    },
    button: {
        backgroundColor: 'lightskyblue',
        borderRadius: 10,
        borderWidth:0.5,
        width: '48%',
        
    },
    buttonText: {
        textAlign: 'center',
        color: '#333333',
        alignItems:'center',
        marginVertical:12
    },
    buttonDisabled: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        borderWidth:0.5,
        width: '48%',
    },
    textSubTitle:{
        textAlign:'left',
        flex:1,
        marginLeft:5
    },
})