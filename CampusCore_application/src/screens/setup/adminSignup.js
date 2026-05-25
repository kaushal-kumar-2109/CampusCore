import React, { useState } from "react";
import {View,Text,TextInput,Pressable,StyleSheet,Platform,ScrollView,Image,Dimensions,} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { lightTheme, darkTheme } from "../../global/theam";
import { useColorScheme } from "react-native";
import { verifyAdminSignupEmail } from "../../routers/controllers/adminSetup";

const AdminSignup = ({ navigation }) => {
    const [getLoader, setLoader] = useState(false);

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otp, setOtp] = useState("");

    const [adminName,setAdminName] = useState("");
    const [adminNumber, setAdminNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [collegeName, setCollegeName] = useState("");
    const [collegeCode, setCollegeCode] = useState("");
    const [collegeType, setCollegeType] = useState("");

    const [adminNameErr,setAdminNameErr] = useState("");
    const [adminNumberErr, setAdminNumberErr] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [collegeNameErr, setCollegeNameErr] = useState("");
    const [collegeCodeErr, setCollegeCodeErr] = useState("");
    const [collegeTypeErr, setCollegeTypeErr] = useState("");

    const [otpError, setOtpError] = useState("");
    const [message, setMessage] = useState(""); 

    const colorScheme = useColorScheme();
    const theme = colorScheme === "dark" ? darkTheme : lightTheme;
    const windowHeight = Dimensions.get("window").height; 

    const handleVerifyEmail = async () => {
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
        let res = await verifyAdminSignupEmail(email);
        if(!res.status || res.status != 200){
            setLoader(false);
            return;
        }
        setIsEmailVerified(true);
        setLoader(false);
        setMessage("OTP sent to your email successfully");
    };

    const handleSubmit = () => {
        setLoader(true);

        setAdminNameErr("");setAdminNumberErr("");setOtpError("");setPasswordError("");setEmailError("");
        setCollegeCodeErr("");setCollegeNameErr("");setCollegeTypeErr("");
        setMessage("");

        if(!collegeType){
            setCollegeTypeErr("College type is required");
            setLoader(false);
            return;
        }
        
        if(!collegeCode){
            setCollegeCodeErr("College code is required");
            setLoader(false);
            return;
        }
        if(!collegeName){
            setCollegeNameErr("College name  is required");
            setLoader(false);
            return;
        }
        if(!email){
            setEmailError("Email is required");
            setLoader(false);
            return;
        }
        if(!adminName){
            setAdminNameErr("Name is required");
            setLoader(false);
            return;
        }
        if(!adminNumber){
            setAdminNumberErr("Number is required");
            setLoader(false);
            return;
        }
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
        navigation.navigate("CheckUserAuth")
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
                    <Text style={[styles.title, { color: theme.primary }]}>Admin Signup</Text>
                    <Text style={[styles.subtitle, { color: theme.subText }]}>Welcome to CampusCore</Text>

                    {(getLoader == true) ? <Text>Loding ... </Text>
                    :<>

{/* ******************** The Admin name field start here ******************** */}
                    <Text style={[styles.label, { color: theme.text }]}>Admin name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter admin full name"
                        placeholderTextColor={theme.subText}
                        value={adminName}
                        onChangeText={setAdminName}
                    />
                    {adminNameErr ? (
                    <Text style={styles.errorText}>{adminNameErr}</Text>
                    ) : null}
{/* ******************** The admin name field end here ******************** */}

{/* ******************** The Admin number field start here ******************** */}
                    <Text style={[styles.label, { color: theme.text }]}>Admin Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter admin mobile number"
                        placeholderTextColor={theme.subText}
                        value={adminNumber}
                        onChangeText={setAdminNumber}
                    />
                    {adminNumberErr ? (
                    <Text style={styles.errorText}>{adminNumberErr}</Text>
                    ) : null}
{/* ******************** The admin number field end here ******************** */}

{/* ******************** The Email Field start here ******************** */}
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
{/* ******************** The Email field end here ******************** */}

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

{/* ******************** The college name field start here ******************** */}
                    <Text style={[styles.label, { color: theme.text }]}>College name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter college name"
                        placeholderTextColor={theme.subText}
                        value={collegeName}
                        onChangeText={setCollegeName}
                    />
                    {collegeNameErr ? (
                    <Text style={styles.errorText}>{collegeNameErr}</Text>
                    ) : null}
{/* ******************** The college name field end here ******************** */}

{/* ******************** The college code field start here ******************** */}
                    <Text style={[styles.label, { color: theme.text }]}>College code</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter college code"
                        placeholderTextColor={theme.subText}
                        value={collegeCode}
                        onChangeText={setCollegeCode}
                    />
                    {collegeCodeErr ? (
                    <Text style={styles.errorText}>{collegeCodeErr}</Text>
                    ) : null}
{/* ******************** The college code field end here ******************** */}

{/* ******************** The college type field start here ******************** */}
                    <Text style={[styles.label, { color: theme.text }]}>College type</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter college type"
                        placeholderTextColor={theme.subText}
                        value={collegeType}
                        onChangeText={setCollegeType}
                    />
                    {collegeTypeErr ? (
                    <Text style={styles.errorText}>{collegeTypeErr}</Text>
                    ) : null}
{/* ******************** The college type field end here ******************** */}

                    {message ? (
                    <Text style={styles.successText}>{message}</Text>
                    ) : null}

                    <Pressable style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Create Account</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate("adminLogin")}> 
                        <Text style={styles.signupText}>
                            Have an account?{" "}
                            <Text style={styles.signupLink}>Login account</Text>
                        </Text>
                    </Pressable>
                    </>}
                </View>
        </ScrollView>
    </LinearGradient>
);
};

export {AdminSignup};

const styles = StyleSheet.create({
    gradient: {
        width: "100%",
        height: "100%",
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        backgroundColor: "transparent",
    },
    container: {
        height:"auto",
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