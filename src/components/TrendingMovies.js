import { Text, View, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  if (!data) {
    return <Text>Loading...</Text>; 
  }

  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  };

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', width: width * 0.91 }}>
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.85,
            height: height * 0.6,
            borderRadius: 30
          }}
        />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View style={{ marginTop: 20, marginBottom: 20 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={width * 0.91}
        decelerationRate="fast"
        initialScrollIndex={1}
        getItemLayout={(data, index) => (
          { length: width * 0.625, offset: width * 0.875 * index, index }
        )}
      />
    </View>
  );
};

export default TrendingMovies;