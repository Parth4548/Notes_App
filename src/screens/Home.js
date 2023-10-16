import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import SearchBar from '../component/SearchBar'
import AddItem from '../component/AddItem'

// npm install react-native-vector-icons - if it gives error then install,
// npm i --save-dev @types/react-native-vector-icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation, route}) => {
  const [keyCount, setKeyCount] = useState(1)
  const [titles, setTitles] = useState([])
  const [notes, setNotes] = useState([])
  const [userData, setUserData] = useState([])

  const update = () => {
    const updatedUser = userData.map(user => {
      if (user.key === route.params.cardKey) {
        return {
          ...user,
          title: route.params.titles, // Replace with the new title
          notes: route.params.notes  // Replace with the new notes
        };
      }
      return user;
    });
    setUserData(updatedUser);
  };

  useEffect(() => {
    if (route.params === undefined ) {
      console.log("Home page")
    } else {
      if (route.params.cardKey === undefined ) {
        setKeyCount(keyCount+1);
        route.params === undefined ? undefined : setTitles([...titles, route.params.titles])
        route.params === undefined ? undefined : setNotes([...notes, route.params.notes])
        route.params === undefined ? undefined : setUserData([...userData,
          {
            key: keyCount,
            title: route.params.titles,
            notes: route.params.notes,
          },
        ]);
      } else {
        update()
      }
    }
  }, [route])
  
  // console.log("data:" + userData)
  const onDeleteItem = (key) => {
    console.warn(key);
    const filterData = userData.filter(item => item.key !== key)
    console.log(filterData);
    setUserData(filterData)
  }

  function button(key) {
    Alert.alert(
      'Confirm',
      'Do you want to delete it!',
      [
        { text: 'NO', onPress: () => { console.warn('NO Pressed'); return false } },
        {
          text: 'YES', onPress: () => {
            console.warn('YES Pressed');
            onDeleteItem(key)
          }
        },
      ]
    );
  }
  
  return (
    <View style={styles.mainContainer}>
      <SearchBar userData= {userData}/>
      <FlatList
        numColumns={2}
        data={userData}
        renderItem={( {item} ) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => {navigation.navigate('card', {data: item})}}
            >
              <View style={styles.itemStyle}>
                <View style={styles.itemTopContainer}>
                  <Text
                    style={[styles.textStyle, styles.titleText]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >{item.title}</Text>
                  <TouchableOpacity
                    style={styles.dotsContainer}
                  >
                    <Icon.Button
                      name="dots-vertical"
                      color="#000000"
                      backgroundColor="#EEEEEE"
                      size={30}
                      style={styles.dots}
                      onPress={() => {button(item.key)}}
                    >
                    </Icon.Button>
                  </TouchableOpacity>
                </View>
                {/* <Text style={styles.textStyle}>{item.key}</Text> */}
                <Text
                  style={styles.textStyle}
                  numberOfLines={4}
                  ellipsizeMode="tail"
                >{item.notes}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <AddItem />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  itemContainer: {
    display: "flex",
    width: "50%",
  },
  itemTopContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dotsContainer: {
    position: "absolute",
    left: 100,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  itemStyle: {
    backgroundColor: '#EEEEEE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    elevation: 6,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    minHeight: 175,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
  },
  titleText: {
    fontSize: 22,
    flex: 1,
  },
  textStyle: {
    color: "#000000",
    fontWeight: '400',
    fontSize: 15,
    padding: 10,
  },
  dots: {
    padding: 6,
    borderColor: "#000000",
    borderRadius: 50,
  }
})

export default Home