import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";

const screenHeight = Dimensions.get("window").height;
interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    description: string;
    startDate: string;
    episodeCount: string;
    posterImage: {
      large: string;
    };
  };
}

const HomeScreen = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [anime, setAnime] = useState<Anime | null>(null); // Initialize as null or empty object
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page[limit]=20"
        );
        const data = response.data.data;
        setAnimes(data);
        console.log("Fetched anime list data:", data);
      } catch (err) {
        console.log("Error fetching anime list data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSingleAnime = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://kitsu.io/api/edge/anime/${id}`
          );
          const data = response.data.data;
          setAnime(data);
          console.log("Fetched single anime data:", data);
        }
      } catch (err) {
        console.log("Error fetching single anime data:", err);
      }
    };

    fetchSingleAnime();
  }, [id]);

  if (!anime) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const watch = () => {
    router.push(`watch/${id}/`);
  };

  const handleAnime = (anime: Anime) => {
    router.push(`anime/${anime.id}`);
  };
  const filteredAnimes = animes.filter((anime) => anime.id !== id);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerr}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push("")}>
            <svg
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.1405 13.0607C26.7263 12.4749 26.7263 11.5251 26.1405 10.9393L16.5946 1.3934C16.0088 0.807611 15.0591 0.807611 14.4733 1.3934C13.8875 1.97919 13.8875 2.92893 14.4733 3.51472L22.9586 12L14.4733 20.4853C13.8875 21.0711 13.8875 22.0208 14.4733 22.6066C15.0591 23.1924 16.0088 23.1924 16.5946 22.6066L26.1405 13.0607ZM0 13.5H25.0799V10.5H0V13.5Z"
                fill="white"
              />
            </svg>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: anime.attributes.posterImage.large }}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      {/* <LinearGradient
        colors={["#ffffff00", "#ffffff00", "#000"]}
        style={styles.background}
      /> */}
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>{anime.attributes.canonicalTitle}</Text>
            <View>
              <TouchableOpacity onPress={watch}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={require("@/assets/images/play.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subtitle}>
            {anime.attributes.startDate} - | Action , Adventure , Comedy | 5.0
          </Text>
          <Text style={styles.description}>{anime.attributes.description}</Text>
          <Text style={styles.watch}>Watch Episode</Text>
          {/* <ScrollView
            horizontal
            contentContainerStyle={styles.scrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            {Array.from(
              Array(parseInt(anime.attributes.episodeCount)).keys()
            ).map((index) => (
              <View key={index} style={styles.seasonBox}>
                <Text style={styles.seasonText}>{index + 1}</Text>
              </View>
            ))}
          </ScrollView> */}
          <ScrollView style={styles.animeContainer} horizontal>
            {filteredAnimes.map((anime) => (
              <TouchableOpacity
                key={anime.id}
                onPress={() => handleAnime(anime)}
              >
                <View style={styles.animeItem}>
                  <Image
                    source={{ uri: anime.attributes.posterImage.large }}
                    style={styles.animeImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.animeTitle}>
                    {anime.attributes.canonicalTitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: screenHeight * 0.82,
  },
  headerImage: {
    height: "130%",
    width: "100%",
    position: "absolute",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: screenHeight * 0.82, // Adjust height as needed
  },
  body: {
    paddingHorizontal: 20,
    marginTop: -200,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#fff",
  },
  description: {
    fontSize: 12,
    lineHeight: 22,
    color: "#fff",
  },
  scrollContainer: {
    paddingVertical: 16,
  },
  seasonBox: {
    width: 60,
    height: 30,
    borderRadius: 4,
    backgroundColor: "#FF5252",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  seasonText: {
    color: "white",
    fontWeight: "bold",
  },
  animeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
    marginTop: 20,
  },
  animeItem: {
    width: 120,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  animeImage: {
    width: 130,
    height: 180,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  animeTitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  watch: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 20,
  },
  headerr: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -40,
    alignItems: "center",
    margin: 20,
    zIndex: 1,
  },
});

export default HomeScreen;
