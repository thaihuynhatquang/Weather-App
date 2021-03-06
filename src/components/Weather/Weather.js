import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherHeader from "./WeatherHeader";
import WeatherBody from "./WeatherBody";
import * as middlewares from "../../utils/middlewares";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  ACTIVE_TINT_COLOR
} from "../../../src/utils/constant";

export default class Weather extends Component {
  render() {
    const { forecastWeather, navigation } = this.props;

    // const weatherInformation = middlewares.analysisData(forecastWeather.list);
    return (
      <View style={styles.weatherContainer}>
        <WeatherHeader
          city={forecastWeather.city.name}
          country={forecastWeather.city.country}
          navigation={navigation}
        />
        <WeatherBody weatherInformation={forecastWeather} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  tempText: {
    fontSize: 20,
    color: ACTIVE_TINT_COLOR
  },
  bodyContainer: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingLeft: 25,
    marginBottom: 40
  },
  subtitle: {
    fontSize: 24,
    color: ACTIVE_TINT_COLOR
  }
});
