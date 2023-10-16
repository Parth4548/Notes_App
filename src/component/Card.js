import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// npm install react-native-vector-icons - if it gives error then install,
// npm i --save-dev @types/react-native-vector-icons
import Icon from 'react-native-vector-icons/MaterialIcons';

const Card = ({route}) => {
  const [cardKey, setCardKey] = useState()
  const [titles, setTitles] = useState("")
  const [notes, setNotes] = useState("")
  const [clicked, setClicked] = useState(false)
  const [changeText, setChangeText] = useState(0)
  const navigation = useNavigation()
  
  const isclicked = () => {
    if (notes !== '' && notes !== undefined) {
      setClicked(true)
    }
    else {
      setClicked(false)
    }
  }

  useEffect(() => {
    console.log()
    route.params === undefined ? undefined : setTitles(route.params.data.title)
    route.params === undefined ? undefined : setNotes(route.params.data.notes)
    route.params === undefined ? undefined : setCardKey(route.params.data.key)
  }, [route])

  useEffect(() => {
    isclicked()
  }, [changeText])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name="delete"
          color="#000000"
          backgroundColor="#ffffff"
          size={30}
          style={{ padding: 5, }}
          onPress={() => {
            Alert.alert("Delete Note","Are you sure you want to delete this note?",[
              {
                text:"CANCLE",
              },
              {
                text:"DELETE",
                onPress:()=>{
                  navigation.navigate('home')
                }
              },
            ])
          }}>
        </Icon.Button>
      ),
    })
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.inputContainer, {marginTop: 15,}]}>
        <TextInput
          style={[styles.inputStyle, {fontSize: 22,}]}
          multiline={true}
          placeholder={"Title"}
          value={titles}
          onChangeText={(title) => setTitles(title)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          numberOfLines={10}
          multiline={true}
          placeholder={"Note"}
          value={notes}
          onChangeText={(notes) => {
            setNotes(notes)
            setChangeText(changeText + 1)
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: route.params === undefined ? clicked ? "#000000" : "gray" : "#000000"
            },
          ]}
          disabled={route.params === undefined ? !clicked : false}
          onPress={() => {
            navigation.navigate('home', { cardKey, titles, notes })
          }}
        >
          <Text style={styles.buttonText}>{route.params === undefined ? "Add" : "Update"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  inputContainer: {
    paddingHorizontal: 15,
  },
  inputStyle: {
    color: "#000000",
    textAlignVertical: "top",
    fontWeight: '400',
    fontSize: 15,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
    opacity: 0.8,
    width: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#eee",
  },
})

export default Card