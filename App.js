// import React from "react";
// import { createRootNavigator } from "./utils/navigations";
// import { Provider } from "react-redux";
// import { isSignedIn } from "./utils/auth";

// import configureStore from "./src/store/configureStore";
// import { YellowBox } from "react-native";

// const store = configureStore();

// //This line igrone warning in debugger mode
// YellowBox.ignoreWarnings(["Remote debugger"]);

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       signedIn: false,
//       checkedSignIn: false
//     };
//   }

//   componentDidMount() {
//     isSignedIn()
//       .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
//       .catch(err => alert("An error occurred"));
//   }

//   render() {
//     const { checkedSignIn, signedIn } = this.state;
//     if (!checkedSignIn) {
//       return null;
//     }
//     const Layout = createRootNavigator(signedIn);
//     return (
//       <Provider store={store}>
//         <Layout />
//       </Provider>
//     );
//   }
// }

//Demo thử login google nhé
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { signInWithGoogleAsync } from "./utils/auth";
export default class App extends React.Component {
  googleLoginStart = () => {
    console.log("HIHI");
    signInWithGoogleAsync();
  };
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Google Login"
          onPress={this.googleLoginStart}
          color="red"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
