import React from "react";
import { Text, SafeAreaView } from "react-native";
import { Location, Permissions } from "expo";
import Map from "./components/Map";
import YelpService from "./services/yelp";

// A placeholder until we get our own location
const region = {
  latitude: 41.8781,
  longitude: -87.6298,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};
const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends React.Component {
  state = {
    region: null,
    coffeeShops: []
  };

  componentWillMount() {
    this.getLocationAsync();
  }

  getCoffeeShops = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const coffeeShops = await YelpService.getCoffeeShops(userLocation);
    this.setState({ coffeeShops });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
      await this.getCoffeeShops();
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    await this.setState({ region });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Map region={region} places={this.state.coffeeShops} />
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
};
