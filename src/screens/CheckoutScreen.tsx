import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { postCheckout } from "../api/mockApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen({ route, navigation }: any) {
  const { eventId } = route.params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [loading, setLoading] = useState(false);

  function validEmail(e: string) {
    return /.+@.+\..+/.test(e);
  }

  async function submit() {
    if (!name.trim() || !validEmail(email) || Number(quantity) < 1) {
      Alert.alert(
        "Validation",
        "Please fill name, valid email, and quantity >= 1"
      );
      return;
    }
    setLoading(true);
    try {
      const res = await postCheckout({
        eventId,
        quantity: Number(quantity),
        buyer: { name, email },
      });
      if (res.success)
        navigation.replace("Success", { reference: res.reference });
      else Alert.alert("Checkout failed", "Not enough tickets available.");
    } catch (e: any) {
      Alert.alert("Network", e.message || "Failed to process checkout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className={`p-[12px] space-y-[25px] flex-1`}>
      <View className={`flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
        <Text className={`text-[20px] font-black`}>CHECKOUT</Text>
      </View>
      <View className={`space-y-[6px]`}>
        <Text>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          className={`p-[10px] border-[1.5px] border-[#000] rounded-[10px]`}
        />
      </View>
      <View className={`space-y-[6px]`}>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className={`p-[10px] border-[1.5px] border-[#000] rounded-[10px]`}
        />
      </View>
      <View className={`space-y-[6px]`}>
        <Text>Quantity</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="number-pad"
          className={`p-[10px] border-[1.5px] border-[#000] rounded-[10px]`}
        />
      </View>
      <View className={`px-[10px] py-[10px] bg-[#039] rounded-[10px]`}>
        <Button
          title={loading ? "Processing..." : "Pay"}
          onPress={submit}
          disabled={loading}
          color={"#FFF"}
        />
      </View>
    </SafeAreaView>
  );
}
