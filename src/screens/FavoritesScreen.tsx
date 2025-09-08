import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { getFavorites } from "../store/offlineStore";
import { getCachedPages } from "../store/offlineStore";

export default function FavoritesScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const favs = await getFavorites();
    const pages = await getCachedPages();
    const merged: any[] = [];
    Object.keys(pages).forEach((k) => merged.push(...pages[Number(k)]));
    const filtered = merged.filter((it) => favs.includes(it.id));
    setItems(filtered);
  }

  if (!items.length)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No favorites yet.</Text>
        <Button
          title="Browse events"
          onPress={() => navigation.navigate("Events")}
        />
      </View>
    );

  console.log("FAVOURITE-------", items);

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            margin: 12,
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#fff",
            elevation: 2,
          }}
          onPress={() =>
            navigation.navigate("EventDetail", { eventId: item.id })
          }
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: "100%", height: 160 }}
            resizeMode="cover"
          />
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {item.title}
            </Text>
            <Text style={{ color: "gray", marginTop: 4 }}>{item.city}</Text>
          </View>
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
