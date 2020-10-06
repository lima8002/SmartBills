import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity,SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const DetailScreen = (props) => {

   
    const navigation = useNavigation()

    const [update,setUpdate] = useState(false)
    const [btName,setBtName] = useState('Edit')
    const [itemDesc, setItemDesc] = useState(props.route.params.description)
    const [itemDate, setItemDate] = useState(props.route.params.date)
    const [itemAmount, setItemAmount] = useState(props.route.params.amount)

    const enableEdit = () => {
        if (btName === 'Edit') {
            setUpdate(true)
            setBtName('Save')
        } else {
            setUpdate(false)
            setBtName('Edit')
            
            props.update({
              id: props.route.params.id,  
              description: itemDesc,
              date: itemDate,
              amount: itemAmount
            })
        }
    }

    const deleteBill = () => {

    }

    return (
        <SafeAreaView style={DetailStyles.container}>
            <Text style={DetailStyles.textTitle}>Bill Detail</Text>

            <Text>Description: </Text>
            <TextInput 
                style={ update ? DetailStyles.input : DetailStyles.inputDisabled }
                placeholder='add description'
                value={itemDesc}
                editable={update}
                onChangeText={(text) => setItemDesc(text)}
            />
            <Text>Next due date:</Text>
            <TextInput 
                style={ update ? DetailStyles.input : DetailStyles.inputDisabled }
                placeholder='insert the day' 
                value={itemDate}
                editable={update}
                onChangeText={(text) => setItemDate(text)}
                
            />
            <Text>Amount:</Text>
            <TextInput 
                style={ update ? DetailStyles.input : DetailStyles.inputDisabled }
                placeholder='insert the amount' 
                value={itemAmount}
                editable={update}
                onChangeText={(text) => setItemAmount(text)}
            />

            <View style={DetailStyles.icons}>
                <TouchableOpacity style={ update ? DetailStyles.buttonUpdate : DetailStyles.button }  >
                    <Text style={DetailStyles.buttonText} onPress={ () => enableEdit()}>{btName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={DetailStyles.button}  >
                    <Text style={DetailStyles.buttonText} onPress={() => {
                        props.delete(props.route.params.id)
                        navigation.goBack()
                    }}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={DetailStyles.button} onPress={ () => navigation.goBack()}>
                    <Text style={DetailStyles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const DetailStyles = StyleSheet.create({
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
    inputDisabled: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'lightgray',
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
        width: '31.5%',
        
    },
    buttonUpdate: {
        backgroundColor: 'lightgreen',
        borderRadius: 10,
        borderWidth:0.5,
        width: '31.5%',
        
    },
    buttonText: {
        textAlign:'center',
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