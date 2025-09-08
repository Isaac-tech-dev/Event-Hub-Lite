import React, { useRef } from "react";
import { View, Text, Button } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function CheckoutSuccessScreen({ route, navigation }: any) {
  const { reference } = route.params;
  const confettiRef = useRef<any>(null);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* 🎉 Confetti */}
      <ConfettiCannon
        ref={confettiRef}
        count={200}
        origin={{ x: 0, y: 0 }}
        fadeOut={true}
        autoStart={true}
      />

      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Purchase successful
      </Text>
      <Text style={{ marginTop: 12 }}>Reference: {reference}</Text>

      <View style={{ marginTop: 24 }}>
        <Button
          title="Back to events"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
}
