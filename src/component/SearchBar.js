import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SearchBar = ({userData}) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={()=>{navigation.navigate('Search',{userData})}}>
        <Text
          style={styles.inputStyle}
        >Search Your Notes</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal:30,
        margin: 20,
        padding: 10,
        fontSize: 20,
    }
})

export default SearchBar