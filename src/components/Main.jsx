import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import CigarList from './CigarList';
import AppBar from './AppBar';
import AddNew from './AddNew';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
  },
});


const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/home" element={<CigarList />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
