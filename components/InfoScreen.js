/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Feather from 'react-native-vector-icons/Feather';
import {fetchProfileDetails} from './fetchAPI';
import {useTheme} from './ThemeProvider';

class InfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      loading: true,
      error: '',
      profile: null,
    };
  }

  async componentDidMount() {
    try {
      const profile = await fetchProfileDetails();
      this.setState({profile, loading: false});
    } catch (error) {
      this.setState({
        error: 'Error fetching profile details',
      });
    }
  }

  render() {
    const {theme} = this.props;
    const {focusedInput, loading, profile} = this.state;

    const data = [
      {
        id: 1,
        title: 'Display Name',
        placeholder: '',
        description:
          'Display names are public and used wherever this profile appears publicly, like contributions, comments on updates, public info on expenses, etc.',
        value: `${profile?.name}`,
      },
      {
        id: 2,
        title: 'Legal Name (optional)',
        placeholder: 'e.g., Maria Garcia',
        description:
          'Legal names are private and used in receipts, tax forms, payment details on expenses, and other non-public contexts. Legal names are only visible to admins.',
        value: `${profile?.legalName}`,
      },
      {
        id: 3,
        title: 'Company',
        placeholder: '',
        description:
          'Start with @ to reference an organization (e.g., @airbnb)',
        value: '',
      },
      {
        id: 4,
        title: 'Short description',
        placeholder: '',
        description: '',
        value: `${profile?.description}`,
      },
      {
        id: 5,
        title: 'Handle',
        placeholder: 'https://opencollective.com/sanjay-sargam',
        description: 'Set your profile URL',
        value: `https://opencollective.com/${profile?.slug}`,
      },
      {
        id: 6,
        title: 'Currency',
        placeholder: '',
        value: `${profile?.currency}`,
      },
      {
        id: 7,
        title: 'Location',
        placeholder: '',
        description: 'Choose country',
        value: `${profile?.location.country}`,
      },
      {
        id: 8,
        title: 'Address',
        placeholder: '',
        description: '',
        value: `${profile?.location.structured.address1}`,
      },
      {
        id: 9,
        title: 'Apartment, suite, etc. (optional)',
        placeholder: '',
        description: '',
        value: `${profile?.location.structured.address2}`,
      },
      {
        id: 10,
        title: 'City',
        placeholder: '',
        description: '',
        value: `${profile?.location.structured.city}`,
      },
      {
        id: 11,
        title: 'State',
        placeholder: '',
        description: '',
        value: `${profile?.location.structured.zone}`,
      },
      {
        id: 12,
        title: 'PIN code',
        placeholder: '',
        description: '',
        value: `${profile?.location.structured.postalCode}`,
      },
    ];

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
      },
      toolbar: {
        flexDirection: 'row',
        // alignItems: 'center',
        // alignSelf: 'center',
        padding: 20,
        backgroundColor: '#97b7f3',
      },
      editContainer: {
        flex: 1,
        margin: 20,
      },
      profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      edit: {
        marginTop: 25,
      },
      saveButton: {
        borderRadius: 20,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        backgroundColor: '#97b7f3',
      },
      title: {
        color: theme.backgroundColor,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
      },
      icon: {
        fontSize: 30,
        color: theme.backgroundColor,
      },
      profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      changeProfileTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',

        flex: 1,
        // borderRadius:20,
        // borderWidth: 1,
        // borderColor:'#d6d4d4',
        // padding:8
      },
      changeProfileText: {
        fontWeight: 'bold',
        color: theme.textColor,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.borderColor,
        backgroundColor: theme.backgroundColor,
        padding: 8,
        // fontWeight:'bold'
      },
      input: {
        borderWidth: 1,
        borderColor: theme.borderColor,
        backgroundColor: theme.backgroundColor,
        borderRadius: 20,
        paddingHorizontal: 15,
        marginTop: 16,
        color: theme.textColor,
      },
      editTitle: {
        color: theme.textColor,
        fontWeight: 'bold',
      },
    });

    // if (loading) {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator size="large" color="#000" />
    //     </View>
    //   );
    // }

    // if (error) {
    //   return (
    //     <View style={styles.container}>
    //       <Text>Error: {error}</Text>
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Feather name="chevron-left" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Personal Info</Text>
        </View>
        <ScrollView style={styles.editContainer}>
          <View style={styles.profileContainer}>
            {loading ? (
              <SkeletonPlaceholder>
                <View style={styles.profile} />
              </SkeletonPlaceholder>
            ) : (
              <Image source={{uri: profile?.imageUrl}} style={styles.profile} />
            )}

            <View style={styles.changeProfileTextContainer}>
              <Text style={styles.changeProfileText}>
                Change Profile Picture
              </Text>
            </View>
          </View>
          {data.map(({title, placeholder, id, description, value}) => (
            <View style={styles.edit} key={id}>
              <Text style={styles.editTitle}>{title}</Text>
              <TextInput
                placeholder={placeholder}
                style={[
                  styles.input,
                  focusedInput === id ? {borderColor: theme.textColor} : {},
                ]}
                value={value}
                onFocus={() => this.setState({focusedInput: id})}
                onBlur={() => this.setState({focusedInput: 0})}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginLeft: 8,
                  marginRight: 8,
                  color: theme.textColor,
                }}>
                {description}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.saveButton}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              color: theme.backgroundColor,
              justifyContent: 'center',
              padding: 10,
              fontWeight: 'bold',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function ThemedInfoScreen(props) {
  const {theme, toggleTheme} = useTheme();
  return <InfoScreen {...props} theme={theme} toggleTheme={toggleTheme} />;
}
