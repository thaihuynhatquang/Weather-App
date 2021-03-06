import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  TEXT_SMALL_SIZE,
  BACKGROUND_SECOND_COLOR
} from "../../utils/constant";
import WeatherBodyCurrentDetails from "./WeatherBodyCurrentDetails";

var _ = require("lodash");
export default class WeatherBodyCurrent extends Component {
  render() {
    const { futureInformation, currentInformation } = this.props;
    return (
      <View style={styles.cardCurrentInformation}>
        <View style={styles.currentInformation}>
          <View>
            <Text style={styles.currentDay}>Today</Text>
            <Text style={styles.temperature}>
              {_.round(currentInformation.temp)}˚
            </Text>
            <Text style={styles.description}>
              {_.startCase(currentInformation.description)}
            </Text>
          </View>
          <Image
            style={{
              height: 50,
              width: 50
            }}
            source={{
              uri: `http://openweathermap.org/img/w/${
                currentInformation.icon
              }.png`
            }}
          />
        </View>
        <WeatherBodyCurrentDetails information={futureInformation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardCurrentInformation: {
    flex: 0,
    backgroundColor: BACKGROUND_SECOND_COLOR,
    shadowColor: "gray",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    flexDirection: "column",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5
  },
  currentInformation: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  currentDay: {
    color: "white",
    fontSize: TEXT_LARGE_SIZE,
    fontWeight: "bold",
    marginBottom: 5
  },
  temperature: {
    color: "white",
    fontSize: TEXT_LARGE_SIZE * 2
  },
  datetime: {
    fontSize: TEXT_SMALL_SIZE,
    color: "white",
    marginBottom: 5
  },
  description: {
    fontSize: TEXT_MEDIUM_SIZE,
    color: "white",
    marginBottom: 5
  }
});
