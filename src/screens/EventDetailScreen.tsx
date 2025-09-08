import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getEventById } from "../api/mockApi";
import {
  cacheEventDetail,
  getCachedDetail,
  toggleFavorite,
  getFavorites,
} from "../store/offlineStore";
import { Ionicons } from "@expo/vector-icons";

export default function EventDetailScreen({ route, navigation }: any) {
  const { eventId } = route.params;
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    load();
    (async () => {
      setFavIds(await getFavorites());
    })();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const d = await getEventById(eventId);
      setDetail(d);
      await cacheEventDetail(d);
    } catch (e) {
      const cached = await getCachedDetail(eventId);
      if (cached) setDetail(cached);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <View className={`flex-1 items-center justify-center`}>
        <ActivityIndicator size={"large"} style={{ marginTop: 40 }} />
      </View>
    );
  if (!detail)
    return (
      <View className={`flex-1 px-[12px] py-[12px] mt-[60px]`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ margin: 16 }}>Unable to load event.</Text>
      </View>
    );

  const isSoldOut = detail.remaining <= 0;
  const isFav = favIds.includes(detail.id);

  console.log("DETAILS---------", detail);

  return (
    <ScrollView className={`flex-1 px-[12px] py-[12px] mt-[60px]`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{ uri: detail.thumbnail }}
          style={{ width: "100%", height: 200, borderRadius: 8 }}
          className={`mt-[10px]`}
        />
        <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 12 }}>
          {detail.title}
        </Text>
        <Text style={{ marginTop: 6 }}>
          {detail.venue} • {detail.city}
        </Text>
        <Text style={{ marginTop: 6 }}>
          Speakers: {detail.speakers.join(", ")}
        </Text>

        <View
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
          }}
        >
          <Text>{detail.description}</Text>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            {detail.remaining}/{detail.capacity} available
          </Text>

          <TouchableOpacity
            onPress={async () => {
              const list = await toggleFavorite(detail.id);
              setFavIds(list);
            }}
          >
            <Ionicons
              name={isFav ? "heart" : "heart-outline"}
              size={28}
              color={isFav ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 18 }}>
          <Button
            title={isSoldOut ? "Sold out — Join waitlist" : "Buy ticket"}
            onPress={() =>
              navigation.navigate("Checkout", { eventId: detail.id })
            }
            disabled={isSoldOut}
          />
        </View>
      </View>
    </ScrollView>
  );
}
