import React, { useState } from "react";
import { View, StyleSheet, Dimensions, LayoutRectangle } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { event, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDecay } from "react-native-reanimated";
import { clamp } from "react-native-redash";

import { Card, Cards, CARD_HEIGHT, CARD_WIDTH } from "../../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// not used
interface GestureProps {
  width: number;
  height: number;
}

const Gesture = ({ width, height }: GestureProps) => {
  const [container, setContainer] = useState<null | LayoutRectangle>(null);

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const boundX = container?.width - CARD_WIDTH
  const boundY = container?.height - CARD_HEIGHT

  const onGestureEvent = useAnimatedGestureHandler({
    //when the animation starts , it stores it position in the ctx state
    onStart: (event, ctx) => {
      ctx.offsetX = translateX.value
      ctx.offsetY = translateY.value
    },
    onActive: (event, ctx) => {
      /*  
        offsetX added, remember the last coordinates and it adds it to the start point of the animation, 
        so that it appears that animation started from the last end point 
        and centers the touch 
     */

      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX)
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY)
    },
    onEnd: (event) => {
      console.log(container?.height)
      // console.log(width)
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, boundX]
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, boundY]
      });
    }
  })

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ],
      // backgroundColor: '#000'
    }

  })

  // console.log({ width, height });
  return (
    <View style={styles.container} onLayout={({ nativeEvent: { layout } }) => setContainer(layout)}>
      {container && <PanGestureHandler {...{ onGestureEvent }}>
        <Animated.View {...{ style }}>
          <Card card={Cards.Card1} />
        </Animated.View>
      </PanGestureHandler>}
    </View>
  );
};

export default Gesture;
