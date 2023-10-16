import { StyleSheet, Text, View ,FlatList ,TextInput,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'

const Search = ({ route, navigation }) => {
    const { userData } = route.params;
    console.log(userData);


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);

    // Your notes data array
    const allNotes = userData;
    console.log(allNotes);

    // Update filteredNotes when searchQuery changes

    useEffect(() => {
        console.log(searchQuery);
        const filtered = allNotes.filter(note =>
            note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredNotes(filtered);
        console.log(filteredNotes);
    }, [searchQuery]);


    return (
        <View style={styles.viewStyle}>
            <View style={styles.searchStyle}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Search Your Notes'
                    placeholderTextColor='#999'
                    autoCapitalize='none'
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
                </View>
                <View style={styles.listviewStyle}>
                    <FlatList
                        style={styles.listStyle}
                        data={filteredNotes}
                        numColumns='2'
                        renderItem={({ item }) => { 
                            return (
                                <View style={styles.flatviewStyle}>
                                    <TouchableOpacity style={{ height: '100%', width: '100%' }}
                                        onPress={() => { navigation.navigate('card', {data: item})}}>
                                        <Text numberOfLines={1} style={{ fontSize: 27 }}>{item.title}</Text>
                                        <Text numberOfLines={3} style={{ fontSize: 17 }}>{item.notes}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }}
                    />
                </View>
            
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    viewStyle: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    inputStyle: {
        fontSize: 23,
        padding: 10,
    },
    searchStyle: {
        paddingHorizontal: 20,
        position: 'absolute',
        marginTop: 12,
        marginHorizontal: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 6,
        borderColor: '#999',
        borderWidth: 0,
        borderRadius: 25,
        backgroundColor: '#FFF',
        opacity: 0.9,
        width: 320,
        top: 0,
        zIndex: 1,
    },
    flatviewStyle: {
        width: 160,
        height: 160,
        marginTop: 30,
        marginBottom: 0,
        marginLeft: 30,
        padding: 9,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#EEEEEE',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        elevation: 6,
        borderRadius: 15,
        zIndex: 2,
    },
    listStyle: {
        height: '90%',
        top: 70,
    }
})