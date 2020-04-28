import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const inputField= props =>{
    return <TextInput {...props} style={{...styles.inputField, ...props.style}} />
};
const styles=StyleSheet.create({
    inputField:{
        height:30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default inputField;