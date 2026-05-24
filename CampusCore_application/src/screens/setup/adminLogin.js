
import React, { useState } from "react";
import {View,Text,TextInput,Pressable,StyleSheet,Platform,ScrollView,Image,Dimensions,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme, darkTheme } from "../../global/theam";
import { useColorScheme } from "react-native";

const AdminLogin = ({ navigation }) => {
    const [getLoader, setLoader] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [message, setMessage] = useState(""); 
    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? darkTheme : lightTheme;
    const windowHeight = Dimensions.get("window").height; 

    const handleVerifyEmail = () => {
        setLoader(true);
        setEmailError("");
        setMessage("");
        if (!email.trim()) {
            setEmailError("Email is required");
            setLoader(false);
            return;
        }
        if (!email.includes("@")) {
            setEmailError("Enter a valid email address");
            setLoader(false);
            return;
        }

        setIsEmailVerified(true);
        setLoader(false);
        setMessage("OTP sent to your email successfully");
    };

    const handleSubmit = () => {
        setLoader(true);
        setOtpError("");
        setPasswordError("");
        setMessage("");
        if (!isEmailVerified) {
            setEmailError("Please verify your email first");
            setLoader(false);
            return;
        }
        if (!otp.trim()) {
            setOtpError("OTP is required");
            setLoader(false);
            return;
        }
        if (otp.length !== 6) {
            setOtpError("OTP must be 6 digits");
            setLoader(false);
            return;
        }
        if (!password.trim()) {
            setPasswordError("Password is required");
            setLoader(false);
            return;
        }
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            setLoader(false);
            return;
        }
        setMessage("Login successful");
        setLoader(false);
        navigation.navigate("CheckUserAuth");
    };

    return (
        <LinearGradient
            colors={["#e0eafc", "#cfdef3"]}
            style={[styles.gradient, { minHeight: windowHeight }]}
        >
            <ScrollView
                style={[{height:"auto",maxHeight:"90%"}]}
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}> 
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("../../../assets/Logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={[styles.title, { color: theme.primary }]}>Admin Login</Text>
                    <Text style={[styles.subtitle, { color: theme.subText }]}>Welcome back to CampusCore</Text>

                    {(getLoader == true) ? <Text>Loding ... </Text>
                    :<>
                    <Text style={[styles.label, { color: theme.text }]}>Email Address</Text>
                    <View style={styles.emailRow}>
                        <TextInput
                            style={[
                                styles.input,
                                styles.emailInput,
                                isEmailVerified && styles.disabledInput,
                            ]}
                            placeholder="Enter admin email"
                            placeholderTextColor={theme.subText}
                            value={email}
                            onChangeText={setEmail}
                            editable={!isEmailVerified}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {email.length > 0 && (
                        <Pressable
                            style={[
                                styles.verifyButton,
                                isEmailVerified && styles.verifiedButton,
                            ]}
                            onPress={handleVerifyEmail}
                            disabled={isEmailVerified}
                        >
                            <Text style={styles.verifyText}>
                                {isEmailVerified ? "Verified" : "Verify"}
                            </Text>
                        </Pressable>
                        )}
                    </View>
                    {emailError ? (
                        <Text style={styles.errorText}>{emailError}</Text>
                    ) : null}

                    <Text style={[styles.label, { color: theme.text }]}>OTP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        placeholderTextColor={theme.subText}
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                    {otpError ? (
                    <Text style={styles.errorText}>{otpError}</Text>
                    ) : null}

                    <Text style={[styles.label, { color: theme.text }]}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        placeholderTextColor={theme.subText}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}

                    {message ? (
                    <Text style={styles.successText}>{message}</Text>
                    ) : null}

                    <Pressable style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Login</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("adminSignup")}> 
                        <Text style={styles.signupText}>
                            Don&apos;t have an account?{" "}
                            <Text style={styles.signupLink}>Create account</Text>
                        </Text>
                    </Pressable>
                    </>}
                </View>
        </ScrollView>
    </LinearGradient>
);
};

export { AdminLogin };

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        backgroundColor: "transparent",
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 0,
    },
    card: {
        borderRadius: 24,
        width:"90%",
        minWidth:"99%",
        maxWidth:500,
        padding: 24,
        borderWidth: 1.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 8,
        alignSelf: 'center',
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 16,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#e0eafc",
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 28,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 8,
        marginTop: 14,
    },
    emailRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    input: {
        height: 54,
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: "#0F172A",
        backgroundColor: "#FFFFFF",
    },
    emailInput: {
        flex: 1,
    },
    disabledInput: {
        backgroundColor: "#F1F5F9",
        color: "#64748B",
    },
    verifyButton: {
        height: 54,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
    },
    verifiedButton: {
        backgroundColor: "#10B981",
    },
    verifyText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    errorText: {
        color: "#EF4444",
        fontSize: 13,
        marginTop: 6,
    },
    successText: {
        color: "#10B981",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 14,
        textAlign: "center",
    },
    submitButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    submitText: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "800",
    },
    signupText: {
        marginTop: 20,
        textAlign: "center",
        color: "#64748B",
        fontSize: 14,
    },
    signupLink: {
        color: "#4F46E5",
        fontWeight: "800",
    },
});