import { useState, useEffect, useCallback } from "react";
import eventsData from "../data/events.json";

export type Event = {
  id: string;
  title: string;
  category: string;
  startsAt: string;
  city: string;
  price?: number;
  thumbnail: string;
};

type Params = {
  q?: string;
  category?: string;
};

export function useEvents({ q, category }: Params) {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const perPage = 2; // 👈 simulate pagination

  const fetchEvents = async (pageNum: number, query?: string, cat?: string) => {
    // Simulate API delay + 10% chance of failure
    await new Promise((res) =>
      setTimeout(res, 300 + Math.random() * 500)
    );
    if (Math.random() < 0.1) throw new Error("Network error");

    let filtered = eventsData as Event[];

    if (query) {
      filtered = filtered.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (cat) {
      filtered = filtered.filter((e) => e.category === cat);
    }

    return filtered.slice((pageNum - 1) * perPage, pageNum * perPage);
  };

  const load = useCallback(
    async (reset = false) => {
      if (reset) {
        setRefreshing(true);
        setPage(1);
      } else {
        setLoading(true);
      }

      try {
        const data = await fetchEvents(reset ? 1 : page, q, category);
        if (reset) {
          setEvents(data);
        } else {
          setEvents((prev) => [...prev, ...data]);
        }
      } catch (e) {
        console.warn("Failed to load events:", e);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [page, q, category]
  );

  useEffect(() => {
    load(true);
  }, [q, category]);

  const refresh = useCallback(() => {
    load(true);
  }, [load]);

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  useEffect(() => {
    if (page > 1) load(false);
  }, [page]);

  return { events, loading, refreshing, refresh, loadMore };
}
