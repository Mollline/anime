import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CircularProgress } from "@material-ui/core";
import Mnu from "@/components/Mnu";

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
  const [anime, setAnime] = useState<Anime | null>(null); // Initialize as null or empty object
  const { id } = useLocalSearchParams();
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [episodeContent, setEpisodeContent] = useState<string | null>(null);
  const router = useRouter();

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

  const handleEpisodeClick = (episode: number) => {
    setSelectedEpisode(episode);
    // Simulate fetching episode content (replace this with your actual content fetching logic)
    setEpisodeContent(`Content for episode ${episode + 1}`);
  };

  if (!anime) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const feedBack = () => {
    alert("Thank you for your feedback");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerr}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Mnu />
          <Image
            style={{ width: 60, height: 50 }}
            source={require("@/assets/images/logo.png")}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => router.push(`anime/${id}`)}>
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
      <View style={styles.body}>
        <View style={styles.movie}>
          <CircularProgress
            size={60}
            thickness={6}
            style={{ color: "white" }}
          />
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer}
          showsHorizontalScrollIndicator={false}
        >
          {Array.from(
            Array(parseInt(anime.attributes.episodeCount)).keys()
          ).map((index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleEpisodeClick(index)}
            >
              <View
                style={[
                  styles.seasonBox,
                  selectedEpisode === index && styles.selectedSeasonBox,
                ]}
              >
                <Text style={styles.seasonText}>{index + 1}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.watchBody}>
          <Image
            source={{ uri: anime.attributes.posterImage.large }}
            style={styles.headerImage}
          />
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>
                {anime.attributes.canonicalTitle}
              </Text>
            </View>
            <Text style={styles.subtitle}>
              {anime.attributes.startDate} - | Action , Adventure , Comedy | 5.0
            </Text>
            <Text style={styles.description}>
              {anime.attributes.description}
            </Text>
          </View>
        </View>
        {selectedEpisode !== null && (
          <View style={styles.episodeContent}>
            <Text style={styles.episodeContentText}>{episodeContent}</Text>
          </View>
        )}
        <View style={styles.voteNow}>
          <View style={styles.voteQuestion}>
            Please send us feedback about this application.
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 60,
              alignItems: "center",
              marginTop: 39,
            }}
          >
            <TouchableOpacity onPress={feedBack}>
              <View>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("@/assets/images/emoji.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={feedBack}>
              <View>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("@/assets/images/happy-face.png")}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={feedBack}>
              <View>
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require("@/assets/images/superstar.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
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
    height: 130,
    width: 100,
    marginRight: 20,
  },
  nameLogo: {
    height: 80,
    width: 227,
    position: "absolute",
    bottom: 10,
  },
  body: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    width: 300,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
    marginTop: 10,
  },
  description: {
    fontSize: 12,
    lineHeight: 22,
    color: "#fff",
    width: 300,
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
  selectedSeasonBox: {
    backgroundColor: "grey",
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
  input: {
    width: 200,
    height: 30,
    borderRadius: 3,
  },
  inputB: {
    height: 33,
  },
  headerr: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    margin: 20,
  },
  movie: {
    width: "100%",
    height: 250,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
  watchBody: {
    flexDirection: "row",
    marginTop: 50,
  },
  episodeContent: {
    marginTop: 20,
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
  },
  episodeContentText: {
    color: "#fff",
    fontSize: 16,
  },
  voteNow: {
    width: 400,
    height: 200,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  voteQuestion: {
    width: 400,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
  },
});

export default HomeScreen;
