import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  loadWeatherInformation,
  loadCityInformation,
  clearListCity
} from "../../store/actions/weatherAction";
import { loadLocationInformation } from "../../store/actions/locationAction";
import { loadNewsInformation } from "../../store/actions/newsWeatherAction";
import { Button, SearchBar } from "react-native-elements";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  TEXT_SMALL_SIZE,
  TEXT_LARGE_SIZE,
  TEXT_MEDIUM_SIZE,
  BACKGROUND_THIRD_COLOR,
  BACKGROUND_SECOND_COLOR,
  ACTIVE_TINT_COLOR
} from "../../utils/constant";

var screen = Dimensions.get("screen");

class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      searchValue: null
    };
  }

  updateSearch = searchValue => {
    this.setState({ searchValue });
  };

  searchCity = () => {
    const city = this.state.searchValue;
    if (!city) {
      Alert.alert("At least 2 letters");
    } else {
      check = city.match(/([A-Za-z])/g);
      if (check && check.length > 2) {
        this.props.fetchListCityInformation(city);
      } else {
        Alert.alert("At least 2 letters");
      }
    }
    this.search.clear();
  };

  onChooseCity = city => {
    this.props.clearListCity();
    const coords = {
      lat: city.coord.lat,
      lon: city.coord.lon
    };
    this.props.fetchWeatherInformation(coords);
  };

  onCloseSearchModal = () => {
    this.props.closeSearchModal();
    this.props.clearListCity();
  };

  render() {
    const { listCity, isLoading } = this.props;
    const { searchValue } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.modalContainer}
        keyboardVerticalOffset={Platform.select({ ios: 5, android: -500 })}
        behavior="padding"
      >
        <View style={styles.innerContainer}>
          <SearchBar
            ref={search => (this.search = search)}
            placeholder="Enter City Here"
            onChangeText={this.updateSearch}
            showLoading={isLoading}
            autoCorrect={false}
            value={searchValue}
            containerStyle={{
              backgroundColor: "transparent",
              borderTopWidth: 0,
              borderBottomWidth: 0,
              padding: 0
            }}
            errorMessage={"At least 2 letters"}
            errorStyle={{
              color: "#cacbd5",
              fontStyle: "italic"
            }}
            inputContainerStyle={{
              backgroundColor: ACTIVE_TINT_COLOR,
              borderRadius: 3
            }}
            inputStyle={{
              color: BACKGROUND_SECOND_COLOR
            }}
          />
          <FlatList
            data={listCity}
            renderItem={({ item }) => (
              <Button
                onPress={() => this.onChooseCity(item)}
                title={item.name + ", " + item.country + " "}
                titleStyle={{
                  color: ACTIVE_TINT_COLOR
                }}
                icon={
                  <Image
                    style={{
                      height: 11,
                      width: 16
                    }}
                    source={{
                      uri: `http://openweathermap.org/images/flags/${item.country.toLowerCase()}.png`
                    }}
                  />
                }
                rightIcon={true}
                type="clear"
              />
            )}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={
              <Button
                title="No data. Enter your city above"
                titleStyle={{
                  color: ACTIVE_TINT_COLOR,
                  fontSize: TEXT_SMALL_SIZE,
                  fontStyle: "italic"
                }}
                type="clear"
              />
            }
          />

          <View style={styles.button}>
            <Button
              onPress={() => this.searchCity()}
              title="Search"
              buttonStyle={{
                backgroundColor: ACTIVE_TINT_COLOR,
                marginRight: 15
              }}
              titleStyle={{
                color: BACKGROUND_SECOND_COLOR,
                fontSize: TEXT_MEDIUM_SIZE
              }}
            />
            <Button
              onPress={() => this.onCloseSearchModal()}
              title="Close"
              buttonStyle={{
                backgroundColor: ACTIVE_TINT_COLOR,
                marginLeft: 15
              }}
              titleStyle={{
                color: BACKGROUND_SECOND_COLOR,
                fontSize: TEXT_MEDIUM_SIZE
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => ({
  listCity: state.weatherReducer.listCity,
  isLoading: state.weatherReducer.isLoadingCity
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInformation: location =>
    dispatch(loadWeatherInformation(location)),
  fetchListCityInformation: cityName => dispatch(loadCityInformation(cityName)),
  fetchLocationInformation: coords => dispatch(loadLocationInformation(coords)),
  fetchNewsInformation: coords => dispatch(loadNewsInformation(coords)),
  clearListCity: () => dispatch(clearListCity())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchModal);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  innerContainer: {
    backgroundColor: BACKGROUND_SECOND_COLOR,
    width: screen.width * 0.9,
    height: screen.height * 0.5,
    padding: 20,
    borderRadius: 4
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 3,
    padding: 4
  }
});
