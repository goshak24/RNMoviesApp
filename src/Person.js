import { Dimensions, StyleSheet, Text, Image, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import MovieList from './components/MovieList';

var {width, height} = Dimensions.get('window'); 

const PersonScreen = () => {
    const navigation = useNavigation(); 
    const [isFavouraite, setFavouraite] = useState(false); 
    const [personMovies, setPersonMovies] = useState(['','','']); 

  return (
    <ScrollView className="flex-1 bg-neutral-900">
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4">
          <TouchableOpacity style={{backgroundColor: 'orange', marginLeft: 5, marginTop: 3}} className="rounded" onPress={() => navigation.goBack()}> 
            <ChevronLeftIcon size="35" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 5, marginTop: 3}} onPress={() => setFavouraite(!isFavouraite)} className="rounded">
            <HeartIcon size="35" color={isFavouraite ? "red" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <View className="flex-row justify-center mt-5" style={{shadowColor: 'gray', shadowRadius: 40, shadowOffset: {width: 0, height: 5}, shadowOpacity: 1}}>
          <View className="items-center rounded-full overflow-hidden h-72 w-72">
            <Image source={require('../assets/favicon.png')} style={{height:height*0.43, width: width*0.74}} />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves 
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            London, United Kingdom 
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1968-02-20</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known For</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">75.2</Text>
          </View> 
        </View>
        <View className="my-6 space-y-2">
            <MovieList title="Movies" data={personMovies} />
        </View>
    </ScrollView>
  )
} 

export default PersonScreen 