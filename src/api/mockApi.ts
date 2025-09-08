import events from "../data/events.json";
import {
  EventListItem,
  EventDetail,
  CheckoutRequest,
  CheckoutResponse,
} from "../types/types";

const MIN_LATENCY = 300;
const MAX_LATENCY = 800;
const FAILURE_RATE = 0.1; // 10%

function randLatency() {
  return MIN_LATENCY + Math.floor(Math.random() * (MAX_LATENCY - MIN_LATENCY));
}

function maybeFail() {
  return Math.random() < FAILURE_RATE;
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function getEvents({
  page = 1,
  perPage = 15,
  q,
  category,
}: {
  page?: number;
  perPage?: number;
  q?: string;
  category?: string;
}) {
  await sleep(randLatency());
  if (maybeFail()) throw new Error("Network error");

  let list: EventListItem[] = events as EventListItem[];
  if (q) {
    const lower = q.toLowerCase();
    list = list.filter((it) => it.title.toLowerCase().includes(lower));
  }
  if (category) list = list.filter((it) => it.category === category);

  const start = (page - 1) * perPage;
  const paged = list.slice(start, start + perPage);
  const hasMore = start + perPage < list.length;
  return { items: paged, page, perPage, hasMore };
}

export async function getEventById(id: string): Promise<EventDetail> {
  // optional: simulate network latency + errors
  await sleep(randLatency());
  if (maybeFail()) throw new Error("Network error");

  // find in the events list
  const detail = events.find((e) => e.id === id);
  if (!detail) throw new Error("Not found");

  return detail as EventDetail;
}

export async function postCheckout(
  payload: CheckoutRequest
): Promise<CheckoutResponse> {
  await sleep(randLatency());
  if (maybeFail()) throw new Error("Network error");

  // Find the event in the JSON list
  const detail = (events as EventDetail[]).find(
    (e) => e.id === payload.eventId
  );

  if (!detail) throw new Error("Event not found");

  // Check if enough tickets are available
  if (detail.remaining < payload.quantity) {
    return { success: false, reference: "" };
  }

  // Reduce remaining tickets (in-memory only, won’t persist if you restart the app)
  detail.remaining = Math.max(0, detail.remaining - payload.quantity);

  // Generate reference for checkout
  const ref = generateReference();
  return { success: true, reference: ref };
}

function generateReference() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const seq = Math.floor(Math.random() * 900000 + 100000);
  return `EH-${date}-${seq}`;
}
