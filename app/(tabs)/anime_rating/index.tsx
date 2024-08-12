import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import Mnu from "@/components/Mnu";

interface Anime {
  id: string;
  attributes: {
    canonicalTitle: string;
    averageRating: number;
  };
}

const TabTwoScreen: React.FC = () => {
  const router = useRouter();
  const [rating, setRating] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://kitsu.io/api/edge/anime?page[limit]=20"
        );
        const data: Anime[] = response.data.data;
        console.log("Fetched:", data);
        setRating(data);
      } catch (err) {
        console.log("Error fetching anime list data:", err);
      }
    };

    fetchData();
  }, []);

  // Sort rating data by averageRating in descending order
  const sortedRating = rating.sort(
    (a, b) => b.attributes.averageRating - a.attributes.averageRating
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Mnu />
        <Image
          style={{ width: 60, height: 50 }}
          source={require("@/assets/images/logo.png")}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Top Rated Anime</Text>
      </View>
      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerCell]}>Rank</Text>
          <Text style={[styles.cell, styles.headerCell]}>Title</Text>
          <Text style={[styles.cell, styles.headerCell]}>Rating</Text>
        </View>
        {sortedRating.map((anime, index) => (
          <View key={anime.id} style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{anime.attributes.canonicalTitle}</Text>
            <Text style={styles.cell}>{anime.attributes.averageRating}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  table: {
    width: "90%",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 10,
  },
  headerRow: {
    backgroundColor: "#333",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 10,
  },
  headerCell: {
    fontWeight: "bold",
  },
});

export default TabTwoScreen;
