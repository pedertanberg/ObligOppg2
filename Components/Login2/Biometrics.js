import * as React from 'react';
import { Text, View, StyleSheet, Alert, Button, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import MainScreen from '../../MainScreen';


// Note: Der er pt. nogle isssues med iOS 13 og LocalAuthentication.

export default class Biometrcis extends React.Component {
    // Vi har et par flags i state som bruges

    state = {
        hasBiometricHardware: null,
        hasBiometricData: null,
        isRequestingBiometricLogin: false,
        isLoggedInBiometic:false,
        email: '1',
        password: '2',
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

    // Vi checker om det er muligt at bruge biometrics
    componentDidMount = () => {
        this.checkBiometricAvailability();
    };

    checkBiometricAvailability = async () => {
        const hasBiometricHardware = await LocalAuthentication.hasHardwareAsync();
        const hasBiometricData = await LocalAuthentication.isEnrolledAsync();
        this.setState({
            hasBiometricHardware,
            hasBiometricData,
        });
    };

    // Vi foretager en biometrisk scanning
    requestBiometricLogin = async () => {
        try {
            // For at kunne vise en besked på android, sætter vi dette flag i this.state
            this.setState({
                isRequestingBiometricLogin: true,
            });
            const response = await LocalAuthentication.authenticateAsync({
                promptMessage: 'log in with faceID/touchID?',
                fallbackLabel: 'use your passcode',
            });


            if (response.success) {
                this.setState({isLoggedInBiometic:true})
                
            } else {
                Alert.alert('Failure');
            }
            this.setState({
                isRequestingBiometricLogin: false,
            });
            // Vi viser en evt fejl som kommer tilbage
            if (response.error) {
                Alert.alert(response.error);
            }
        } catch (error) {
            // Vi viser en fejl hvis kaldets promise rejecter
            Alert.alert(error.message);
        }
    };

    // For at kunne annullere på Android har vi denne
    cancelBiometricLogin = () => {
        LocalAuthentication.cancelAuthenticate();
    };

    logout =() =>{
        this.setState({isLoggedInBiometic:false})
    }

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
    }



    render() {
        const {isLoggedInBiometic} = this.state;

        if(!isLoggedInBiometic){
            const {
                hasBiometricData,
                hasBiometricHardware,
                isRequestingBiometricLogin,
            } = this.state;
            return (
                <View style={styles.container}>
                    <Text style={styles.paragraph}>
                        Login inn med fingerprint eller faceID!
                    </Text>
                    {/*   Vi viser knappen hvis brugerens device understøtter biometrics
         */}
                    {hasBiometricData && hasBiometricHardware && (
                        <Button
                            title="Biometric logg inn"
                            onPress={this.requestBiometricLogin}
                            
                        />
                    )}
                    {/*   På Android viser vi 
                    denne besked når brugeren skal scanne sin finger
         */}
                    {isRequestingBiometricLogin && Platform.OS === 'android' && (
                        <View>
                            <Text>Put your finger on fingerprint scanner now.</Text>
                            <Button title="Cancel" 
                            onPress={this.cancelBiometricLogin} 
                            />

                        </View>
                    )}
                </View>
        
            );
        }else {
            return (
            this.handleSubmit()
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});