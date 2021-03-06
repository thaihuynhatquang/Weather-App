import React from "react";
import { createRootNavigator } from "./src/utils/navigations";
import { Provider } from "react-redux";
import { isSignedIn } from "./src/utils/auth";
import { Permissions } from "expo";
import configureStore from "./src/store/configureStore";
import { YellowBox, Alert } from "react-native";

const store = configureStore();

//This line igrone warning in debugger mode
YellowBox.ignoreWarnings(["Remote debugger"]);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    isSignedIn()
      .then(res => {
        if (res) {
          this.setState({ signedIn: res });
        }
      })
      .catch(err => Alert.alert("An error occurred"));
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}
