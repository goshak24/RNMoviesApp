import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Cast = ({data, navigation}) => {
    let personName = "Keanu Reeves"; 
    let characterName = "John Wick"; 
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data && data.map((person, index) => {
                return (
                    <TouchableOpacity key={index} className="mr-4 items-center" onPress={()=> navigation.navigate('Person')}>
                        <View className="rounded overflow-hidden items-center">
                            <Image
                                className="rounded-2xl h-24 w-28"
                                source={require('../../assets/favicon.png')}
                            />
                            <Text className="text-white text-xs mt-1">
                                {
                                    characterName.length<10 ? characterName.slice(0,10) : characterName
                                }
                            </Text>
                            <Text className="text-neutral-400 text-xs mt-1">
                                {
                                    personName.length<10 ? personName.slice(0,10) : personName
                                }   
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
        )}
      </ScrollView>
    </View>
  )
}

export default Cast 
