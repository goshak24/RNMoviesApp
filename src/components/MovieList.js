import { ScrollView, StyleSheet, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image342 } from '../api/moviedb';

const MovieList = ({ title, data, hideSeeAll }) => { // Default data to an empty array
  const navigation = useNavigation();

  if (!data) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={{ color: '#93C5FD' }} className="text-lg">Explore More</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => { // Safe to use map now
          let movieName = item.original_title || "";
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('Movie', item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={{ uri: image342(item.poster_path) }}
                  style={{ width: 200, height: 300 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14 ? movieName.slice(0, 14) + "..." : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList; 