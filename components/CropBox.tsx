import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const INITIAL_WIDTH = screenWidth * 0.8;
const INITIAL_HEIGHT = screenHeight * 0.5;
const INITIAL_X = (screenWidth - INITIAL_WIDTH) / 2;
const INITIAL_Y = (screenHeight - INITIAL_HEIGHT) / 2;

const HANDLE_SIZE = 20;

export default function CropBox({
  imageWidth = screenWidth,
  imageHeight = screenHeight,
  onUpdateRect,
}: any) {
  const x = useSharedValue(INITIAL_X);
  const y = useSharedValue(INITIAL_Y);
  const width = useSharedValue(INITIAL_WIDTH);
  const height = useSharedValue(INITIAL_HEIGHT);

  const constrain = () => {
    x.value = Math.max(0, Math.min(x.value, imageWidth - width.value));
    y.value = Math.max(0, Math.min(y.value, imageHeight - height.value));
    width.value = Math.max(50, Math.min(width.value, imageWidth - x.value));
    height.value = Math.max(50, Math.min(height.value, imageHeight - y.value));
  };

  useDerivedValue(() => {
    runOnJS(constrain);
    if (onUpdateRect) {
      runOnJS(onUpdateRect)({
        x: x.value,
        y: y.value,
        width: width.value,
        height: height.value,
      });
    }
  });

  const createCornerGesture = (dxFactor: number, dyFactor: number) =>
    Gesture.Pan().onChange((e) => {
      const newWidth = width.value + dxFactor * e.changeX;
      const newHeight = height.value + dyFactor * e.changeY;
      const newX = dxFactor === -1 ? x.value + e.changeX : x.value;
      const newY = dyFactor === -1 ? y.value + e.changeY : y.value;
      width.value = newWidth;
      height.value = newHeight;
      x.value = newX;
      y.value = newY;
    });

  const createEdgeGesture = (horizontal: boolean, edge: string) =>
    Gesture.Pan().onChange((e) => {
      if (horizontal) {
        const deltaY = e.changeY;
        if (edge === 'top') {
          const newHeight = height.value - deltaY;
          const newY = y.value + deltaY;
          if (newHeight >= 50) {
            height.value = newHeight;
            y.value = newY;
          }
        } else {
          const newHeight = height.value + deltaY;
          if (newHeight >= 50) {
            height.value = newHeight;
          }
        }
      } else {
        const deltaX = e.changeX;
        if (edge === 'left') {
          const newWidth = width.value - deltaX;
          const newX = x.value + deltaX;
          if (newWidth >= 50) {
            width.value = newWidth;
            x.value = newX;
          }
        } else {
          const newWidth = width.value + deltaX;
          if (newWidth >= 50) {
            width.value = newWidth;
          }
        }
      }
    });

  const boxStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x.value,
    top: y.value,
    width: width.value,
    height: height.value,
    borderWidth: 2,
    borderColor: 'white',
  }));

  const handleStyle = (left: number, top: number) => [
    styles.handle,
    {
      left: `${left}%`,
      top: `${top}%`,
      marginLeft: -HANDLE_SIZE / 2,
      marginTop: -HANDLE_SIZE / 2,
    },
  ];

  const boxPanGesture = Gesture.Pan().onChange((e) => {
    x.value += e.changeX;
    y.value += e.changeY;
  });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={boxPanGesture}>
        <Animated.View style={boxStyle}>
          <GestureDetector gesture={createCornerGesture(-1, -1)}>
            <Animated.View style={[...handleStyle(0, 0)]} />
          </GestureDetector>
          <GestureDetector gesture={createCornerGesture(1, -1)}>
            <Animated.View style={[...handleStyle(100, 0)]} />
          </GestureDetector>
          <GestureDetector gesture={createCornerGesture(-1, 1)}>
            <Animated.View style={[...handleStyle(0, 100)]} />
          </GestureDetector>
          <GestureDetector gesture={createCornerGesture(1, 1)}>
            <Animated.View style={[...handleStyle(100, 100)]} />
          </GestureDetector>

          <GestureDetector gesture={createEdgeGesture(true, 'top')}>
            <Animated.View style={[styles.edgeHorizontal, { top: 0 }]} />
          </GestureDetector>
          <GestureDetector gesture={createEdgeGesture(true, 'bottom')}>
            <Animated.View style={[styles.edgeHorizontal, { bottom: 0 }]} />
          </GestureDetector>
          <GestureDetector gesture={createEdgeGesture(false, 'left')}>
            <Animated.View style={[styles.edgeVertical, { left: 0 }]} />
          </GestureDetector>
          <GestureDetector gesture={createEdgeGesture(false, 'right')}>
            <Animated.View style={[styles.edgeVertical, { right: 0 }]} />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    backgroundColor: 'white',
    borderRadius: HANDLE_SIZE / 2,
  },
  edgeHorizontal: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  edgeVertical: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    width: 20,
    backgroundColor: 'transparent',
  },
});
