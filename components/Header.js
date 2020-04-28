import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        header: {
            width:'100%',
            height:90,
            paddingTop: 30,
            backgroundColor: '#87cefa',
            alignItems: 'center',
            justifyContent: 'center' 

        },
        headerTitle: {
            fontSize: 18,
            color: 'black'
        }
    }
);

export default header;