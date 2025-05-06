import Main from './src/components/Main';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import theme from './src/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <NativeRouter>
        <Main/>
      </NativeRouter>
    </View>
  );
};

export default App;
