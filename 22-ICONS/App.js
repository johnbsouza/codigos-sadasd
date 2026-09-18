import React, { useRef } from "react";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";

const AnimatableFeather = Animatable.createAnimatableComponent(Feather);

export default function App() {
  const airplayRef = useRef(null);
  const cameraRef = useRef(null);

  function handlePress(ref, message) {
    if (ref.current) {
      ref.current.animate("tada", 800);
    }
    
    setTimeout(() => {
      alert(message);
    }, 500); 
  }

  return (
    <View style={{ backgroundColor: "#E2B93B", flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <AnimatableFeather
        ref={airplayRef}
        name="airplay"
        size={65}
        color="#61933a"
        onPress={() => handlePress(airplayRef, "Airplay Pressed!")}
      />
      <AnimatableFeather
        ref={cameraRef}
        name="camera"
        size={65}
        color="#61933a"
        onPress={() => handlePress(cameraRef, "Camera Pressed!")}
      />
    </View>
  );
}