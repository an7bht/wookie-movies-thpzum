import { Text, View, TouchableOpacity, FlatList, Dimensions, Image, TextInput, Keyboard } from 'react-native'
import React, { useState, useRef } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Loader from '../Loader'

const widthW = Dimensions.get('window').width;
const heightH = Dimensions.get('window').height;
var load;

const Search = ({ navigation, route }) => {
  const [DataFilm, setDataFilm] = useState([]);
  const [FilmGenres, setFilmGenres] = useState([]);
  const listGenres = [];
  const [isLoading, setLoad] = useState(false) 

  const todoInput = useRef();
  const [key, setKey] = useState("");

  const GetDataFilm = () => {
    setLoad(true)
    fetch("https://wookie.codesubmit.io/movies?q=" + key, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer Wookie2019'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (key.length > 0) {
          setDataFilm(data.movies);
          if (data.movies.length != 0) {
            for (var i = 0; i < data.movies.length; i++) {
              listGenres.push(...data.movies[i].genres);
            }
            setFilmGenres(Array.from(new Set(listGenres)));
          }
        }
        setLoad(false)
      })
      .catch(error => console.error(error));
  }
  const ClickImageFilm = (backdrop, cast, classification, director, length_, overview, poster, released_on, slug, title, imdb_rating) => {
    navigation.navigate("Detail", {
      backdrop: backdrop,
      cast: cast,
      classification: classification,
      director: director,
      length_: length_,
      overview: overview,
      poster: poster,
      released_on: released_on,
      slug: slug,
      title: title,
      imdb_rating: imdb_rating
    })
  }
  const onRefresh = () => {
    setDataFilm([]);
    setFilmGenres([]);
    GetDataFilm();
  }
  const Click_SearchView = () => {
    onRefresh();
    Keyboard.dismiss();
  }
  const ListFilm = () => {
    return (
      <FlatList
        data={FilmGenres}
        renderItem={({ item }) =>
          <View >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#032541", marginBottom: 5, marginTop: 10 }}>{item}</Text>
            {(() => {
              const result = DataFilm.filter(({ genres }) => genres.includes(item));
              return (
                <View style={{ flex: 1, }}>
                  <FlatList
                    data={result}
                    renderItem={({ item }) =>
                      <View style={{ flex: 1, marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => ClickImageFilm(item.backdrop, item.cast,
                          item.classification, item.director, item.lenght, item.overview, item.poster,
                          item.released_on, item.slug, item.title, item.imdb_rating)}>
                          <Image source={{ uri: item.poster }} style={{ borderRadius: 5, borderWidth: 1, borderColor: "#666", marginRight: 10, width: 0.3 * widthW, height: 0.25 * heightH, resizeMode: 'contain', }} />
                        </TouchableOpacity>
                      </View>
                    }
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                  />
                </View>
              )
            })()}
          </View>
        }
        keyExtractor={(item) => item}
      />
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Loader style = {{flex:1}} isLoading={isLoading} />
      {/* Logo */}
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "#032541" }}>
        <Text style={{ fontSize: 34, color: "#fff" }}>WOOKIE</Text>
        <Text style={{ fontSize: 34, marginTop: -5, color: "#fff" }}>MOVIES</Text>
      </View>
      {/* Search */}
      <View>
        <View style={{ display: 'flex' }}>
          <View style={{
            flexDirection: "row", backgroundColor: "white",
            paddingHorizontal: 10, borderRadius: 5, paddingVertical: 3, borderWidth: 2, margin: 5, borderColor: "#053e59"
          }}>
            <TextInput style={{ flex: 1, fontSize: 15, fontWeight:"600" }} placeholder='Movie title' onChangeText={(text) => { setKey(text) }} ref={todoInput} />
            <TouchableOpacity onPress={() => Click_SearchView()}>
              <MaterialCommunityIcons name={"magnify"} color={"black"} size={0.04 * heightH} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* List View Home */}
      <View style={{ flex: 1, paddingStart: 15, backgroundColor: "#fff", borderBottomWidth: 2, borderBottomColor: "#6666" }} >
        <ListFilm />
      </View>
    </View>
  )
}

export default Search
