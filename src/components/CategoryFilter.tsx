import React from "react";
import { View, Button } from "react-native";

const CATS = ["Tech", "Business", "Health", "Arts", "Education"];

export default function CategoryFilter({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (c?: string) => void;
}) {
  return (
    <View className={`flex-row mt-[4px] flex-wrap`}>
      <Button title="All" onPress={() => onSelect(undefined)} />
      {CATS.map((c) => (
        <Button key={c} title={c} onPress={() => onSelect(c)} />
      ))}
    </View>
  );
}
