import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

const widthW = Dimensions.get('window').width;
const heightH = Dimensions.get('window').height;

const Detail = ({ route }) => {
  const [isLoading, setLoad] = useState(false)
  const height_ = heightH / 3;
  useEffect(() => {
    setLoad(true)
    if (route.params.backdrop != "") {
      setLoad(false)
    }
  }, []);
  const released_on_str = route.params.released_on.toString().substring(0, 10);
  var castArr = [];
  var cast = "";
  castArr.push(...(route.params.cast))
  for (const value of castArr) {
    if (value == castArr[castArr.length - 1] || castArr.length == 1) {
      cast += value
    } else {
      cast += value + ", "
    }
  }

  return (
    <ScrollView style={{ flex: 1, flexDirection: "column", backgroundColor: "#fff", }}>
      <Loader style={{ flex: 1 }} isLoading={isLoading} />
      {/* backdrop */}
      <Image source={{ uri: route.params.backdrop }} style={{ height: height_, borderWidth: 1, borderColor: "#666", resizeMode: 'stretch' }} />
      <View style={{ flex: 2, paddingHorizontal: "5%" }}>
        <View style={{ flexDirection: 'row' }}>
          {/* poster */}
          <Image source={{ uri: route.params.poster }} style={{
            borderRadius: 5, borderWidth: 0.5, borderColor: "#666",
            marginTop: "-25%", width: 0.3 * widthW, height: 0.25 * heightH, resizeMode: 'contain',
          }} />
          {/* title, rating */}
          <View style={{ flex: 1, }}>
            <Text style={{ fontSize: 24, color: "#032541", marginHorizontal: 10 }}>{route.params.title}</Text>
            <Rating
              readonly
              startingValue={route.params.imdb_rating}
              ratingCount={10}
              imageSize={14}
              style={{ marginRight: "auto", marginTop: 5, marginHorizontal: 10 }}
            />
          </View>
        </View>
        {/*  */}
        <View style={{}}>
          {/* year | length | director */}
          <Text style={{ fontSize: 15, marginTop: 10 }}>{released_on_str + " | " + route.params.length_ + " | " + route.params.director}</Text>
          {/* cast */}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{"Cast: "}</Text>
            <Text style={{ fontSize: 14, marginTop: 3 }}>{cast}</Text>
          </View>
          {/* overview */}
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{"Movie Descriptin: "}</Text>
            <Text style={{ fontSize: 14, }}>{route.params.overview}</Text>
          </View>
          {/* classification */}
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ fontSize: 17, fontWeight: '600' }}>{"Classification: "}</Text>
            <Text style={{ fontSize: 14, marginTop: 3 }}>{route.params.classification}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Detail;
