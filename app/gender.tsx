import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { Typography } from '@/constants/Typography';
import { apiClient } from '@/utils/api';
import { toast } from '@/utils/toast';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COUNTRIES = ["India", "USA", "United Kingdom", "Canada", "Australia", "Germany", "France"];
const GENDERS = ["Male", "Female", "Other"];

export default function GenderScreen() {
  const router = useRouter();
  const { language, fullName } = useLocalSearchParams();
  const [age, setAge] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!countrySearch) return COUNTRIES;
    return COUNTRIES.filter((c) => c.toLowerCase().includes(countrySearch.toLowerCase()));
  }, [countrySearch]);

  const handleNext = async () => {
    if (!age.trim()) {
      toast.error("Error", "Please enter your age");
      return;
    }
    if (!countrySearch.trim()) {
      toast.error("Error", "Please select your country");
      return;
    }
    if (!selectedGender) {
      toast.error("Error", "Please select your gender");
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.patch("/users/me", {
        full_name: fullName,
        age: parseInt(age),
        country: countrySearch,
        gender: selectedGender,
      });

      if (response.status === 401) {
        toast.error("Session Expired", "Please login again.");
        router.replace("/");
        return;
      }

      const data = await response.json();

      if (response.ok) {
        router.replace("/onboarding");
      } else {
        console.log(data);
        const errorMsg = data.detail?.message || data.message || "Failed to update profile.";
        toast.error("Update Failed", errorMsg);
      }
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Connection Error", "Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderDropdown = (
    options: string[],
    onSelect: (val: string) => void,
    visible: boolean,
    onClose: () => void,
  ) => {
    if (!visible || options.length === 0) return null;
    return (
      <View style={styles.dropdownContainer}>
        <ScrollView style={{ maxHeight: 200 }} keyboardShouldPersistTaps="handled">
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.dropdownOption}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
            >
              <Text style={styles.dropdownOptionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#E2F4FF"]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Top Navigation & Progress */}
          <View style={styles.topNavContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="#111111" />
            </TouchableOpacity>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            bounces={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.titleText}>Hi {fullName || "Arjun"}!</Text>
              <Text style={styles.subtitleText}>Let us know more about you</Text>
            </View>

            {/* Input Field Form */}
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <AppInput
                  placeholder="Age"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={setAge}
                  style={styles.inputStyle}
                />
              </View>

              <View style={[styles.inputWrapper, { zIndex: 10 }]}>
                <AppInput
                  placeholder="Country"
                  value={countrySearch}
                  onChangeText={(text) => {
                    setCountrySearch(text);
                    setShowCountryDropdown(true);
                  }}
                  onFocus={() => setShowCountryDropdown(true)}
                  style={styles.inputStyle}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowCountryDropdown(!showCountryDropdown)}>
                      <Feather
                        name={showCountryDropdown ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#8A8A8E"
                      />
                    </TouchableOpacity>
                  }
                />
                {renderDropdown(filteredCountries, setCountrySearch, showCountryDropdown, () =>
                  setShowCountryDropdown(false),
                )}
              </View>

              <View style={[styles.inputWrapper, { zIndex: 5 }]}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.fullWidth}
                  onPress={() => {
                    setShowGenderDropdown(!showGenderDropdown);
                    setShowCountryDropdown(false);
                  }}
                >
                  <AppInput
                    placeholder="Gender"
                    value={selectedGender}
                    style={styles.inputStyle}
                    editable={false}
                    pointerEvents="none"
                    rightIcon={
                      <Feather
                        name={showGenderDropdown ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#8A8A8E"
                      />
                    }
                  />
                </TouchableOpacity>
                {renderDropdown(GENDERS, setSelectedGender, showGenderDropdown, () =>
                  setShowGenderDropdown(false),
                )}
              </View>

              <AppButton
                title={isLoading ? "" : "Next"}
                style={styles.nextButton}
                onPress={handleNext}
                disabled={isLoading}
                icon={isLoading ? <ActivityIndicator color="#FFF" /> : undefined}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  topNavContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(60, 97, 221, 0.1)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    width: "39%",
    height: "100%",
    backgroundColor: "#3C61DD",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 60,
  },
  titleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 32,
    color: "#111111",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitleText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.sizes.subtitle,
    color: "#8A8A8E",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 16,
  },
  fullWidth: {
    width: "100%",
  },
  inputStyle: {
    marginBottom: 0,
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(0,0,0,0.05)",
  },
  nextButton: {
    marginTop: 8,
  },
  dropdownContainer: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  dropdownOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F7",
  },
  dropdownOptionText: {
    fontFamily: Typography.fonts.regular,
    fontSize: 16,
    color: "#333333",
  },
});
