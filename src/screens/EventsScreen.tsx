import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { getEvents } from "../api/mockApi";
import { cacheEventsPage, getCachedPages } from "../store/offlineStore";
import EventCard from "../components/EventCard";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

export default function EventsScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  // 👇 show only 10 per page
  const perPage = 10;

  useEffect(() => {
    loadPage(1, true);
  }, [query, category]);

  async function loadPage(p: number, reset = false) {
    setLoading(true);
    try {
      const res = await getEvents({
        page: p,
        perPage,
        q: query.trim() || undefined,
        category,
      });
      setItems(res.items);
      setHasMore(res.hasMore);
      setPage(p);
      await cacheEventsPage(p, res.items);
    } catch (e) {
      const cached = await getCachedPages();
      const merged: any[] = [];
      Object.keys(cached)
        .sort()
        .forEach((k) => merged.push(...cached[Number(k)]));
      setItems(merged);
    } finally {
      setLoading(false);
    }
  }

  const goNext = () => {
    if (!loading && hasMore) loadPage(page + 1);
  };

  const goPrev = () => {
    if (!loading && page > 1) loadPage(page - 1);
  };

  return (
    <View className="flex-1 w-full">
      <StatusBar style="dark" />
      <View className="px-[10px] py-[10px]">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={() => setQuery("")}
        />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </View>

      {items.length === 0 && !loading ? (
        <View className="flex-1 items-center justify-center">
          <Text>No results. Try clearing filters.</Text>
          <Button
            title="Clear filters"
            onPress={() => {
              setQuery("");
              setCategory(undefined);
            }}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <EventCard
                item={item}
                onPress={() =>
                  navigation.navigate("EventDetail", { eventId: item.id })
                }
              />
            )}
            ListFooterComponent={() =>
              loading ? <ActivityIndicator style={{ margin: 12 }} /> : null
            }
            showsVerticalScrollIndicator={false}
          />

          {/* Pagination Controls */}
          <View className="flex-row justify-between items-center px-4 py-3 border-t">
            <Button
              title="Previous"
              onPress={goPrev}
              disabled={loading || page === 1}
            />
            <Text>
              Page {page}
            </Text>
            <Button
              title="Next"
              onPress={goNext}
              disabled={loading || !hasMore}
            />
          </View>
        </>
      )}
    </View>
  );
}
