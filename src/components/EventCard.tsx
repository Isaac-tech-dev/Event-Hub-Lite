import React, { memo } from "react";
import { Pressable, Image, View, Text, TouchableOpacity } from "react-native";
import { format } from 'date-fns';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EventListItem } from '../types/types';

type EventCardProps = {
  item: {
    id: string;
    title: string;
    thumbnail: string;
    startsAt: string;
    city: string;
    price?: number;
  };
};

export default function EventCard({ item, onPress }: { item: EventListItem; onPress: () => void }) {
return (
<TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
<Image source={{ uri: item.thumbnail }} style={{ width: 120, height: 72, borderRadius: 8, marginRight: 12 }} />
<View style={{ flex: 1 }}>
<Text numberOfLines={2} style={{ fontWeight: '600' }}>{item.title}</Text>
<Text style={{ marginTop: 6 }}>{format(new Date(item.startsAt), 'MMM d, yyyy h:mm a')} • {item.city}</Text>
<Text style={{ marginTop: 8, fontWeight: '700' }}>₦{item.price.toLocaleString()}</Text>
</View>
</TouchableOpacity>
);
}
