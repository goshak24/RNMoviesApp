import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'; 
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Bars3BottomLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from './components/TrendingMovies';
import MovieList from './components/MovieList';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } from './api/moviedb';

const HomeScreen = () => {
    const [trending, setTrending] = useState(); 
    const [upcoming, setUpcoming] = useState([1,2,3]); 
    const [topRated, setTopRated] = useState([1,2,3]); 
    const navigation = useNavigation(); 

    useEffect(() => {
      getTrendingMovies(); 
      getUpcomingMovies(); 
      getTopRatedMovies(); 
    }, [])

    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      if (data && data.results && data.results.length > 0) {
        setTrending(data.results); 
      } else {
        setTrending([]); 
      }
    } 

    const getUpcomingMovies = async () => {
      const data = await fetchUpcomingMovies(); 
      if (data && data.results && data.results.length > 0) {
        setUpcoming(data.results); 
      } else {
        setUpcoming([]); 
      }
    } 

    const getTopRatedMovies = async () => {
      const data = await fetchTopRatedMovies(); 
      if (data && data.results && data.results.length > 0) {
        setTopRated(data.results); 
      } else {
        setTopRated([]); 
      }
    } 

    return (
    <View className="flex-1 bg-blue-900"> 

      <SafeAreaView className="mt-10">
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4 mt-4">
          <Bars3BottomLeftIcon size="38" strokeWidth={2} color="white"/> 
          <Text
            className="text-white text-3xl font-bold">
            MovieBox
          </Text>
        </View>
      </SafeAreaView>
      
      <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          
          <TrendingMovies data={trending} />

          <View className="flex-row items-center mx-4 my-4 bg-white rounded-full p-2" style={{marginTop: 0}}>
            <MagnifyingGlassIcon size="20" strokeWidth={2} color="gray"/>
            <TextInput
              placeholder="Search"
              placeholderTextColor="gray"
              className="flex-1 ml-2"
              onFocus={() => navigation.navigate('Search')}
            />
          </View>

          <MovieList title="Latest Releases" data={upcoming} />
          <MovieList title="Top Rated" data={topRated}/>

      </ScrollView>

    </View>
  )
}

export default HomeScreen