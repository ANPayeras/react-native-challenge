import React, { useEffect, useState } from 'react';
import { Image, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { styles } from './Styles'
import Data from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [data, setData] = useState([])
  const [refFlatList, setRefFlatList] = useState()
  const [index, setIndex] = useState({
    currentIndex: 0,
    nextIndex: 1,
    prevIndex: -1
  })
  const { currentIndex, nextIndex, prevIndex } = index

  useEffect(() => {
    setData(Data)
    getData()
  }, [])

  useEffect(() => {
    refFlatList && refFlatList.scrollToIndex({ animated: true, index: currentIndex })
  }, [index])

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.item}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <Text>{item.title}</Text>
      </View>
    )
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('index', JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('index')
      if (value !== null) {
        const indexStored = JSON.parse(value)
        setIndex({
          ...index,
          nextIndex: indexStored + 1,
          currentIndex: indexStored,
          prevIndex: indexStored - 1
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const scrollToNext = () => {
    refFlatList.scrollToIndex({ animated: true, index: nextIndex })
    setIndex({
      ...index,
      nextIndex: nextIndex + 1,
      currentIndex: currentIndex + 1,
      prevIndex: prevIndex + 1
    })
    storeData(nextIndex)
  }

  const scrollToPrev = () => {
    refFlatList.scrollToIndex({ animated: true, index: prevIndex })
    setIndex({
      ...index,
      nextIndex: nextIndex - 1,
      currentIndex: currentIndex - 1,
      prevIndex: prevIndex - 1
    })
    storeData(prevIndex)
  }

  const getItemLayout = (data, index) => (
    { length: Dimensions.get('screen').width, offset: Dimensions.get('screen').width * index, index }
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => 'key' + index}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        ref={(ref) => setRefFlatList(ref)}
      />
      <View
        style={styles.buttonsContainer}
      >
        <TouchableOpacity
          onPress={scrollToPrev}
          disabled={currentIndex === 0 ? true : false}
        >
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={scrollToNext}
          disabled={currentIndex === data.length - 1 ? true : false}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


