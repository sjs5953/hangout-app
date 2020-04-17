import React, {useState} from 'react'
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

const FloatingButtons = ({searchEvents, onRefresh}) => {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map((category,index)=> {
          return(
            <FloatingButtonItem 
              key={index}
              onPress={()=>{
                if (selectedItem==category) {
                  setSelectedItem("");
                  onRefresh();
                } else {
                  setSelectedItem(category);
                  searchEvents('categoryName',category);
                }
                
              }}
              selectedItem={selectedItem}
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
