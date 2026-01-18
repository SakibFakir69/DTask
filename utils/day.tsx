import React from "react";
import { Text } from "react-native";
import dayjs from "dayjs";

export default function CurrentDate() {
  
  const formattedDate = dayjs().format("dddd, MMM D, YYYY");

  return (
    <Text className="text-2xl font-bold text-white">{formattedDate}</Text>
  );
}
