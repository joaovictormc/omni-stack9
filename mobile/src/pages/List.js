import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Image, AsyncStorage, StyleSheet, StatusBar, ScrollView, Alert, TouchableOpacity } from 'react-native';
import SpotList from '../components/SpotList';
import logoImg from '../assets/logo.png';


export default function List({ navigation }) {
    const [techs, setTechs] = useState([]);


    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.25.22:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            })
        });
    }, []);


    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);


    async function handleBack() {
        AsyncStorage.clear('email')
        Alert.alert('Desconectado!');
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#2b2c30" barStyle="ligth-content" />
            
            <TouchableOpacity onPress={() => handleBack()}>
                <Image style={styles.logo} source={logoImg} />
            </TouchableOpacity>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    );  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2c30'
    },

    logo: {
        height: 42,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    },
});