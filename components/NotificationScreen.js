import React, {Component} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {useTheme} from './ThemeProvider';

class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEnabled: false,
    };
  }

  toggleSwitch = () => {
    this.setState(prevState => ({isEnabled: !prevState.isEnabled}));
  };

  render() {
    const {theme} = this.props;
    const styles = StyleSheet.create({
      main: {
        backgroundColor: theme.backgroundPrimary,
        flex: 1,
      },
      container: {
        flexDirection: 'column',
        margin: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
        backgroundColor: theme.backgroundColor,
      },
      header: {
        fontWeight: 'bold',
        color: theme.textColor,
        fontSize: 24,
      },
      content: {
        color: theme.textColor,
      },
      notiContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        marginHorizontal: 10,
        padding: 1,
      },
      horizontalLine: {
        borderBottomColor: theme.textColor,
        borderBottomWidth: 1,
        marginVertical: 10,
      },
    });

    return (
      <View style={styles.main}>
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>
              Updates about the platform and Collectives you support
            </Text>
            <Text style={styles.content}>
              Notifications about us, news we want to share with you related to
              our activities and the development of the platform.
            </Text>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.notiContainer}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{fontSize: 16, color: theme.textColor}}>
              Receive the Open Collective newsletter (monthly)
            </Text>
            <Switch
              trackColor={{false: 'grey', true: '#97b7f3'}}
              thumbColor={this.state.isEnabled ? '#3385ff' : 'white'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default function ThemedNotificationScreen(props) {
  const {theme, toggleTheme} = useTheme();
  return (
    <NotificationScreen {...props} theme={theme} toggleTheme={toggleTheme} />
  );
}
