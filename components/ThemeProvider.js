import React, { Component, createContext } from 'react';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: lightTheme,
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === lightTheme ? darkTheme : lightTheme,
    }));
  };

  render() {
    const { children } = this.props;
    const { theme } = this.state;

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
