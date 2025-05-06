import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    backgroundColor: theme.colors.primary,
  },
});

const Text = ({ 
    ...props
  }) => {
  const textStyle = [
    styles.text,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;