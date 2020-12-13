import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import Animated, { runOnUI, useSharedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { Button } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const formatDatetime = (datetime: Date) => {
  "worklet";
  return datetime.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const msg = 'Hello world'

const sayHello = (sharedValue, text: string, from: string) => {
  "worklet"; //tells reanimated that it is a directive
  sharedValue.value = `${text} ${from} on ${Platform.Version} at ${formatDatetime(new Date())}`
};

const Worklets = () => {
  const text = useSharedValue("")
  return (
    <View style={styles.container}>
      <ReText text={text} />
      <Button label="Say Hello" primary onPress={() => runOnUI(sayHello)(text, 'Hello', "Abhishek")} />
    </View>
  );
};

export default Worklets;
