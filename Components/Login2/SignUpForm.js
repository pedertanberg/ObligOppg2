import * as React from 'react';
import {
    Button, Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
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
        padding: 10,
        color: "#fff",
    },
    header: {
        fontSize: 20,
    },
    activItStack: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000',
        padding: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
            const result = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log(result);
            this.endLoading();
            this.setState({ isCompleted: true });
        } catch (error) {
            // Vi sender `message` feltet fra den error der modtages, videre.
            this.setError(error.message);
            this.endLoading();
        }
    };

    render = () => {
        const { errorMessage, email, password, isCompleted } = this.state;
        if (isCompleted) {
            return <Text>You are now signed up</Text>;
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.activItStack}>
                <Text style={styles.header}>Sign up</Text>
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
        return <Button color="grey" onPress={this.handleSubmit} title="Create user" />;
    };
}
