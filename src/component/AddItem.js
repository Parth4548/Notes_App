import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const AddItem = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.textStyle}
        onPress={() => {
          navigation.navigate( "card" )
        }}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: "20%",
    zIndex: 1,
    },
    textStyle: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: "#ffffff",
      paddingBottom: 4,
      paddingLeft: 1,
      borderRadius: 50,
    },
    text: {
      fontSize: 45,
      color: "black",
    },
})

export default AddItem