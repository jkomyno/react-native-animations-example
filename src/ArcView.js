import React, { Component } from 'react';
import {
  Dimensions,
  StatusBar,
  Animated,
  Easing,
  Text,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { height, width } = Dimensions.get("window");

const MaterialEasingIn = {
  easing: Easing.bezier(0, 0, 0.2, 1),
};

const MaterialEasingOut = {
  easing: Easing.bezier(0.4, 0, 1, 1),
};

const styles = StyleSheet.create({
  arc: {
    backgroundColor: '#607D8B',
    alignItems: 'center',
  },
  arcText: {
    backgroundColor: 'transparent',
    fontWeight: '300',
    color: '#FFF',
    marginTop: 0,
    fontSize: 40,
    opacity: 0,
  },
  arcImage: {
    height: 150,
    width: 150,
  },
  arcImageBox: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
});

export default class ArcView extends Component {

  arcAnimatedStyle = {
    borderRadius: new Animated.Value(15000),
    height: new Animated.Value(50),
    width: new Animated.Value(50),
  };

  /**
   * Animation for showing the main screen
   * parallel execution of multiple animations
   */
  ArcShowScreen = Animated.parallel([
    Animated.timing(this.arcAnimatedStyle.height, {
      toValue: height,
      duration: 500,
      ...MaterialEasingIn,
    }),
    Animated.timing(this.arcAnimatedStyle.width, {
      toValue: height,
      duration: 500,
      ...MaterialEasingIn,
    }),
    Animated.timing(this.arcAnimatedStyle.borderRadius, {
      duration: 500,
      toValue: 0,
      ...MaterialEasingIn,
    }),
  ]);

  componentDidMount() {
    this.startShowScreen();
    setTimeout(() => StatusBar.setBarStyle('light-content', true), 1500);
    this.showHelloMessage();
  }

  startShowScreen = () => {
    setTimeout(() => (
      Animated.sequence([
        this.ArcShowScreen,
      ]).start()
    ), 1500);
  }

  showHelloMessage = () => {
    setTimeout(() => (this.refs.hello.transitionTo({
      marginTop: 150,
      opacity: 1
    }, 400)), 1500);

    setTimeout(() => (this.refs.image.transitionTo({
      marginTop: 60,
      opacity: 1
    }, 400)), 1900);

    setTimeout(() => (this.refs.desc.transitionTo({
      marginTop: 40,
      opacity: 1
    }, 400)), 2300);    
  }

  render() {
    return (
      <Animated.View style={[styles.arc, this.arcAnimatedStyle]}>
        <Animatable.Text ref="hello" style={styles.arcText}>
          This is a test
        </Animatable.Text>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" ref="image" style={styles.arcImageBox}>
          <Animated.Image style={styles.arcImage} source={{uri: 'http://daynin.github.io/clojurescript-presentation/img/react-logo.png'}}/>
        </Animatable.View>
        <Animatable.Text ref="desc" style={[styles.arc__text, { fontSize: 18, fontStyle: 'italic' }]}>
          Brief bottom descending description
        </Animatable.Text>
      </Animated.View>
    );
  }
}
