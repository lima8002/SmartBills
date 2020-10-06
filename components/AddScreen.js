import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity,SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const AddScreen = (props) => {

    // ref to clear fields
    let _desc = null
    let _date = null
    let _amount = null

    const navigation = useNavigation()

    const [desc,setDesc] = useState(null)
    const [date,setDate] = useState(null)
    const [amount,setAmount] = useState(0)
    

    const addItem = () => {
        const itemId = new Date().getTime()
        const itemDesc = desc
        const itemDate = date
        const itemAmount = amount
        props.add({
          id: itemId,
          description: itemDesc,
          date: itemDate,
          amount: itemAmount
        })
        _desc.clear()
        _date.clear()
        _amount.clear()
      }

    return (
        <SafeAreaView style={AddStyles.container}>
            <Text style={AddStyles.textTitle}>Add Bill</Text>

            <Text>Description:</Text>
            <TextInput 
                style={AddStyles.input} 
                placeholder='type the description'
                onChangeText={ (description) => setDesc(description) }
                ref={component=> _desc = component }
            />
            <Text>Date:</Text>
            <TextInput 
                style={AddStyles.input} 
                placeholder='insert the day' 
                onChangeText={ (date) => setDate(date) }
                ref={component=> _date = component }
            />
            <Text>Amount:</Text>
            <TextInput 
                style={AddStyles.input} 
                placeholder='insert the amount' 
                onChangeText={ (amount) => setAmount(amount) }
                keyboardType='decimal-pad'
                ref={component=> _amount = component }
            />
            <View style={AddStyles.icons}>
                <TouchableOpacity style={AddStyles.button} onPress={ () => { addItem() } }>
                    <Text style={AddStyles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AddStyles.button} onPress={ () => navigation.goBack()}>
                    <Text style={AddStyles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const AddStyles = StyleSheet.create({
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