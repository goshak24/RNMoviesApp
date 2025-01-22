import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'; 
import { HeartIcon } from 'react-native-heroicons/solid'; 
import { LinearGradient } from 'expo-linear-gradient';
import Cast from './components/Cast'; 
import { useNavigation } from '@react-navigation/native';
import MovieList from './components/MovieList';
import { fetchMovieDetails, image500 } from './api/moviedb';

const { width, height } = Dimensions.get('window'); 

const MovieScreen = () => {
  const navigation = useNavigation(); 
  const { params: item } = useRoute(); 
  const [isFavourite, setFavourite] = useState(false); 
  const [cast, setCast] = useState([]); // Initialize as empty array
  const [similarMovies, setSimilarMovies] = useState([]); // Initialize as empty array
  const [movie, setMovie] = useState({}); 

  useEffect(() => {
    getMovieDetails(item.id); 
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id); 
    if (data) {
      setMovie(data); 
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
          <TouchableOpacity style={{ backgroundColor: 'orange', marginLeft: 10, marginTop: 3 }} className="rounded" onPress={() => navigation.navigate('HomeScreen')}>
            <ChevronLeftIcon size="35" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 10, marginTop: 5 }} onPress={() => setFavourite(!isFavourite)} className="rounded">
            <HeartIcon size="35" color={isFavourite ? "orange" : "white"} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image 
            source={{ uri: image500(movie.poster_path) }}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient 
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{ width: width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie.title}
        </Text>
        {movie.id && (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie.status} * {movie.release_date} * {movie.runtime} mins
          </Text>
        )}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie.genres && movie.genres.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length; 
            return (
              <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                {genre.name} {showDot ? "." : null}
              </Text>
            );
          })}
        </View>

        <View>
          <Text className="text-neutral-400 semi-bold text-base text-center">{movie.overview}</Text>
        </View>

        <View>
          <Cast navigation={navigation} data={cast} />
        </View>
      </View>

      <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true} />
    </ScrollView>
  );
};

export default MovieScreen; 