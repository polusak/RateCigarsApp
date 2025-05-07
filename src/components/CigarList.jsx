import { Text,
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import CigarItem from './CigarItem';
import theme from '../theme';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';


const getCigars = async () => {
  const cigarCollection  = await firestore().collection('cigars').get();
  const cigarData = cigarCollection.docs;
  return (cigarData);
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: theme.colors.secondary,
  },
  text: {
    color: theme.colors.textPrimary,
    width: screenWidth,
  },
  viewStyle: {
    display: 'flex',
    width: screenWidth,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const CigarList = () => {
  const [cigarsRawList, setCigarsRawList] = useState([]);
  const [cigars, setCigars] = useState([]);

  useEffect(() => {
    const cigarsList = async () => {
      const fetchedCigars = await getCigars();
      setCigarsRawList([].concat(fetchedCigars));
    };
    try {
      cigarsList();
    } catch (error) {
      Alert.alert('Sikarilistan lataaminen epäonnistui.');
    }
  }, []);

  useEffect(() => {
    let localList = [];
    const addCigar = (item) => {
      localList = localList.concat(item._data);
    };
    cigarsRawList.forEach(addCigar);
    setCigars(localList);
  }, [cigarsRawList]);

  return (
    <View>
        <FlatList
          data={cigars}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <CigarItem item={item}/> }
          style={{display: 'flex'}}
        />
    </View>
  );
};

export default CigarList;
