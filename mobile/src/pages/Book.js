import React, { useState } from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet, SafeAreaView, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import logoImg from '../assets/logo.png';
import api from '../services/api';


export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');


    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');
    
        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { user_id }
        })

        Alert.alert('Solicitação enviada com sucesso!');

        navigation.navigate('List');
    }


    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <View style={styles.tela}>
            <StatusBar backgroundColor="#2b2c30" barStyle="ligth-content" />
            <SafeAreaView style={styles.container}>
                <Image style={styles.logoImg} source={logoImg} />

                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 30
    },

    tela: {
        flex: 1,
        backgroundColor: '#2b2c30'
    },

    logoImg: {
        height: 42,
        resizeMode: "contain",
        alignSelf: 'center'
    },

    label: {
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 8,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFF',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});