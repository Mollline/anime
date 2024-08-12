import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import Mnu from "@/components/Mnu";

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    episodeCount: number;
    posterImage: {
      small: string;
    };
  };
}

// Sample data for genres
const genres = [
  "Action",
  "Adventure",
  "Fantasy",
  "Romance",
  "Drama",
  "Comedy",
  "Horror",
];

const TabTwoScreen: React.FC = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAnimes, setFilteredAnimes] = useState<Anime[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page[limit]=20"
        );
        const data = response.data.data;
        setAnimes(data);
        setFilteredAnimes(data);
        console.log("Fetched anime data:", data);
      } catch (err) {
        console.log("Error fetching anime data:", err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAnimes(animes);
    } else {
      const filtered = animes.filter((anime) =>
        anime.attributes.canonicalTitle
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredAnimes(filtered);
    }
  }, [searchQuery, animes]);

  const handleGenrePress = (genre: string) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  const handleAnimePress = (anime: Anime) => {
    router.push(`anime/${anime.id}`);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerr}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Mnu />
          <Image
            style={{ width: 60, height: 50 }}
            source={require("@/assets/images/logo.png")}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.input}
            placeholder="Search anime..."
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <TouchableOpacity style={styles.inputB}>
            <Text style={{ color: "white" }}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {searchQuery.trim() !== "" && (
        <View style={styles.filteredResults}>
          <Text style={styles.header}>Filtered Results:</Text>
          {filteredAnimes.map((anime) => (
            <TouchableOpacity
              key={anime.id}
              style={styles.filteredAnimeItem}
              onPress={() => handleAnimePress(anime)}
            >
              <Text style={styles.filteredAnimeTitle}>
                {anime.attributes.canonicalTitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View>
        <Text style={styles.header}>Choose Genre</Text>
      </View>
      <View style={styles.section}>
        {genres.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.genreItem,
              selectedGenres.includes(genre) && styles.selectedGenreItem,
            ]}
            onPress={() => handleGenrePress(genre)}
          >
            <Text style={styles.genreText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.header}>Popular Animes</Text>
      <ScrollView horizontal>
        <View style={styles.animeSection}>
          <View style={styles.animeRow}>
            {animes.slice(10, 20).map((anime) => (
              <TouchableOpacity
                key={anime.id}
                style={styles.animeItem}
                onPress={() => handleAnimePress(anime)}
              >
                <Image
                  source={{ uri: anime.attributes.posterImage.small }}
                  style={styles.animeImage}
                  resizeMode="cover"
                  accessibilityLabel={`${anime.attributes.canonicalTitle} Image`}
                />
                <Text style={styles.animeTitle}>
                  {anime.attributes.canonicalTitle}
                </Text>
                <Text style={styles.animeEpisode}>
                  {anime.attributes.episodeCount} Episodes
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Text style={styles.header}>For You</Text>
      <ScrollView horizontal>
        <View style={styles.animeSection}>
          <View style={styles.animeRow}>
            {animes.slice(0, 20).map((anime) => (
              <TouchableOpacity
                key={anime.id}
                style={styles.animeItem}
                onPress={() => handleAnimePress(anime)}
              >
                <Image
                  source={{ uri: anime.attributes.posterImage.small }}
                  style={styles.animeImage}
                  resizeMode="cover"
                  accessibilityLabel={`For You: ${anime.attributes.canonicalTitle} Image`}
                />
                <Text style={styles.animeTitle}>
                  {anime.attributes.canonicalTitle}
                </Text>
                <Text style={styles.animeEpisode}>
                  {anime.attributes.episodeCount} Episodes
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  genreItem: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 20,
  },
  selectedGenreItem: {
    backgroundColor: "blue",
  },
  genreText: {
    color: "white",
    fontSize: 15,
  },
  animeSection: {
    marginBottom: 200,
  },
  animeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
    resizeMode: "cover",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 5,
  },
  animeTitle: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  animeEpisode: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    width: 200,
    height: 30,
    borderRadius: 3,
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginRight: 10,
  },
  inputB: {
    height: 33,
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  headerr: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  filteredResults: {
    marginTop: 20,
    marginBottom: 20,
  },
  filteredAnimeItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  filteredAnimeTitle: {
    color: "white",
    fontSize: 16,
  },
});

export default TabTwoScreen;
