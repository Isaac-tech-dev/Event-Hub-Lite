import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventListItem, EventDetail } from '../types/types';


const KEY_CACHED_PAGES = 'eh:cached:pages';
const KEY_CACHED_DETAILS = 'eh:cached:details';
const KEY_FAVORITES = 'eh:favorites';


export async function cacheEventsPage(page: number, items: EventListItem[]) {
try {
const raw = await AsyncStorage.getItem(KEY_CACHED_PAGES);
const pages = raw ? JSON.parse(raw) : {};
pages[page] = items;
await AsyncStorage.setItem(KEY_CACHED_PAGES, JSON.stringify(pages));
} catch (e) {}
}


export async function getCachedPages() {
const raw = await AsyncStorage.getItem(KEY_CACHED_PAGES);
const pages = raw ? JSON.parse(raw) : {};
return pages as Record<number, EventListItem[]>;
}


export async function cacheEventDetail(detail: EventDetail) {
const raw = await AsyncStorage.getItem(KEY_CACHED_DETAILS);
const map = raw ? JSON.parse(raw) : {};
map[detail.id] = detail;
await AsyncStorage.setItem(KEY_CACHED_DETAILS, JSON.stringify(map));
}


export async function getCachedDetail(id: string) {
const raw = await AsyncStorage.getItem(KEY_CACHED_DETAILS);
const map = raw ? JSON.parse(raw) : {};
return map[id] as EventDetail | undefined;
}


export async function toggleFavorite(id: string) {
const raw = await AsyncStorage.getItem(KEY_FAVORITES);
const list = raw ? JSON.parse(raw) : [];
const idx = list.indexOf(id);
if (idx >= 0) list.splice(idx, 1);
else list.push(id);
await AsyncStorage.setItem(KEY_FAVORITES, JSON.stringify(list));
return list;
}


export async function getFavorites() {
const raw = await AsyncStorage.getItem(KEY_FAVORITES);
return raw ? JSON.parse(raw) as string[] : [];
}