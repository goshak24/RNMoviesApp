import { Dimensions, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';  

const { width, height } = Dimensions.get('window');
const Loading = () => {
  return (
    <View>
      <Progress.CircleSnail thickness={12} size={160} color="red" />
    </View>
  )
}

export default Loading 