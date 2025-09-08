import React from "react";
import { View, TextInput, Button } from "react-native";

export default function SearchBar({
  value,
  onChange,
  onClear,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
}) {
  return (
    <View className={`flex-row items-center mb-[5px]`}>
      <TextInput
        placeholder="Search events"
        value={value}
        onChangeText={onChange}
        style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 8 }}
      />
      <Button title="Clear" onPress={onClear} />
    </View>
  );
}
