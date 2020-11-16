import * as React from 'react';
import {
  Button,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ImageBackground,
  KeyboardAvoidingView
} from 'react-native';
import firebase from 'firebase';
import Constants from "expo-constants";


const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
  inputField: {
    borderBottomColor: "#fff",
    borderBottomWidth: 3,
    width: "100%",
    margin: 10,
    color: "#fff",
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  form: {
    height: 230,
    marginTop: 59
  },
  activItStack: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  progressBar: {
    height: 40,
    flexDirection: "row",
    marginLeft: 28,
    marginRight: 28
  },
  icon2: {
    color: "rgba(30,174,199,1)",
    fontSize: 40,
    width: 33,
    height: 40
  },
  rect4: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 40,
    marginLeft: 6,
    marginTop: 16
  },
  icon3: {
    color: "#1fb2cc",
    fontSize: 35,
    width: 40,
    height: 36,
    marginLeft: 4,
    marginTop: 4
  },
  rect5: {
    width: 50,
    height: 7,
    backgroundColor: "rgba(230, 230, 230,1)",
    opacity: 0.75,
    borderRadius: 40,
    marginTop: 16
  },
  icon2Row: {
    height: 40,
    flexDirection: "row"
  },
  icon2RowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  icon4: {
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    width: 34,
    height: 40,
    opacity: 0.75
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 67,
    alignSelf: "center"
  },
  form: {
    height: 230,
    marginTop: 50
  },
  name: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  nameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },

  description: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  emailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  nameColumn: {},
  nameColumnFiller: {
    flex: 1
  },
  password: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  city: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 20
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },

  headerInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 18
  },
  progressBarColumn: {
    marginTop: 53,
    marginLeft: 41,
    marginRight: 41
  },
  progressBarColumnFiller: {
    flex: 1
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 200
  },
  text2: {
    width: 66,
    color: "rgba(255,255,255,1)",
    alignSelf: "center",
    top: "0%"
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center"
  },
  buttonColumn: {
    bottom: "-25%",
    marginLeft: 41,
    marginRight: 41
  }
});

export default class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    isCompleted: false,
    errorMessage: null,
  };

  startLoading = () => this.setState({ isLoading: true });
  endLoading = () => this.setState({ isLoading: false });
  setError = errorMessage => this.setState({ errorMessage });
  clearError = () => this.setState({ errorMessage: null });

  handleChangeEmail = email => this.setState({ email });
  handleChangePassword = password => this.setState({ password });

  handleSubmit = async () => {
    const { email, password } = this.state;
    try {
      this.startLoading();
      this.clearError();
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(result);
      this.endLoading();
      this.setState({ isCompleted: true });
    } catch (error) {
      this.setError(error.message);
      this.endLoading();
    }
  };

  render = () => {
    const { errorMessage, email, password, isCompleted } = this.state;
    if (isCompleted) {
      return <Text>You are now logged in</Text>;
    }
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.activItStack}>

        <Text style={styles.header}>Login</Text>
        <TextInput
          placeholder="email"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={this.handleChangeEmail}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="#fff"
          value={password}
          onChangeText={this.handleChangePassword}
          secureTextEntry
          style={styles.inputField}
        />
        {errorMessage && (
          <Text style={styles.error}>Error: {errorMessage}</Text>
        )}
        {this.renderButton()}

      </KeyboardAvoidingView>
    );
  };

  renderButton = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator />;
    }
    return <Button color="grey" style={styles.button2} onPress={this.handleSubmit} title="Login" />;
  };
}
