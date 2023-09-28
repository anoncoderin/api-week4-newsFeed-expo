import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function Home({ navigation }) {
  const [data, setData] = useState();
  const [showButton, setShowButton] = useState(true);

  const HideButton = () => {
    setShowButton(!showButton);
  };

  var apiKey = "bcbc325fff654e2eb194d2fd3258a2dd";
  var type = "tesla";
  var dateFrom = "2023-09-20";
  var dateTo = "2023-09-20";
  var sortBy = "publishedAt";
  var pageSize = 5;

  const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;

  const GrabNews = () => {
    axios
      .get(url)
      .then((response) => {
        //console.log(response);
        console.clear();
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <StatusBar style="auto" />
        {showButton && (
        <Button
       style={{display:"none"}}
          title="Grab Info"
          onPress={() => [GrabNews(), HideButton()]}
        />
)}
        
        {data &&
          data.articles.map((d, index) => {
            return (
              <View style={styles.innerContainer} key={index}>
                {d.urlToImage && (
                  <Image
                    style={styles.image}
                    source={d.urlToImage}
                    contentFit="cover"

                   alt="Image"
                  />
                )}
                <Text style={styles.author}>{d.author}</Text>
                <Text style={styles.title}>{d.title}</Text>
              </View>
            );
          })}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  author:
  {
    textAlign:"left"
  },
  image:{
    width:230,
    height:230,
    alignItems:"center"
  }
});
