import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

const TabTwoScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={60} thickness={6} style={{ color: "white" }} />
      <Text
        style={{
          color: "white",
          fontSize: 13,
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        There is no subbed or dubbed anime
      </Text>
    </View>
  );
};

export default TabTwoScreen;

// import * as React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View
//         style={{ backgroundColor: "blue", width: "100%", height: 300 }}
//       ></View>
//       <LinearGradient
//         colors={["transparent", "rgba(242,169,59,2)"]}
//         style={styles.background}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "orange",
//   },
//   background: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     bottom: 355,
//     height: 100,
//   },
// });
