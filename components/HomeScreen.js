import React, {useEffect} from 'react'
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

export const HomeScreen = (props) => {

    const navigation = useNavigation()

    const renderList = ({item}) => (
        <ListItem 
            id={item.id}
            description={item.description}
            date={item.date}
            amount={item.amount}

            item={item}
            clickHandler={showDetail}
        />
    )

    const showDetail = (item) => {
        navigation.navigate("Detail", item)
    }

    const doLogout = () => {
        props.logoutAcc()
        navigation.reset({ index: 0, routes: [{name: 'Login'}] })
    }

    return (
        <SafeAreaView style={homeStyle.container}>
          <View style={homeStyle.firstRow} >
            <Text style={homeStyle.textTitle}>Smart Bills</Text>
            <View style={homeStyle.icons} >   
              <TouchableOpacity style={homeStyle.textImg} onPress={ () => doLogout() }>
                <SimpleLineIcons name="logout" size={28} color="black" />  
              </TouchableOpacity>  
              <TouchableOpacity style={homeStyle.textImg} onPress={ () => {navigation.navigate('Add')} }>
                  <Ionicons name="ios-add" size={50} color="black" /> 
              </TouchableOpacity>
                
            </View>
          </View>
          <Text>Upcoming bills:</Text>
          <FlatList
                data = {props.data}
                renderItem = {renderList} 
                keyExtractor = { item => item.id }
                extraData = {props.extraData}
          />
        </SafeAreaView>
    )
}

const ListItem = (props) => {
    return (
            <TouchableOpacity onPress={ () => props.clickHandler(props.item)} >
                <View style={homeStyle.item}>
                    <Text style={homeStyle.textDetails}>Bill: {props.description}</Text>
                    <Text style={homeStyle.textDetails}>Due date: {props.date}</Text>
                    <Text style={homeStyle.textDetails}>$ {props.amount}</Text>
                    
                </View>
            </TouchableOpacity>
        
    )
}

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        margin:10,
        
    },
    textTitle:{
        marginVertical:20,
        fontSize:36,
    },
    item: {
        backgroundColor: 'hsla(213, 37%, 89%, 1.0)',
        marginVertical:8,  
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderWidth: 0.5,
        borderRadius: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        padding: 10,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        marginVertical: 15,
    },
    button: {
        backgroundColor: '#33ffcc',
        padding: 10,
        borderRadius: 10,
    },
    buttonDisabled: {
        backgroundColor: '#c0f9eb',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#333333',
    },
    icons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal: 10
    },
    textDetails:{
        flexDirection:'row',
        justifyContent:'space-around',
        
    },
    firstRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textImg:{
        fontSize: 24,
        marginHorizontal:12
    },

})

