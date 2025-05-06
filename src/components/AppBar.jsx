import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: theme.colors.secondary,
  },
  textboxCigars: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    borderWidth: 10,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
  },
});

const AppBar = () => {

  return (
    <View style = {styles.container}>
      <Link to="/home">
        <Text style = {styles.textboxCigars}> Sikarit </Text>
      </Link>
      <Link to="/add">
        <Text style = {styles.textboxCigars}> Lisää uusi </Text>
      </Link>
    </View>
  );
};

export default AppBar;
