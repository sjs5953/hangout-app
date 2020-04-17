import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import FloatingButtonItem from './FloatingButtonItem'

const categories = [
  "Sports",
  "Game",
  "Movie",
  "Food",
  "Talking",
  "Learning"
]

const FloatingButtons = ({searchEvents}) => {
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category,index)=> {
          return(
            <FloatingButtonItem 
              key={index}
              onPress={()=>searchEvents('categoryName',category)}
              text={category}
            />
          )
        })}
      </ScrollView>
     
    </View>
  )
}

export default FloatingButtons

const styles = StyleSheet.create({})
