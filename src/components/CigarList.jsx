import { Text, FlatList, View, StyleSheet, Dimensions } from 'react-native';
import CigarItem from './CigarItem';
import theme from '../theme';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';


const getCigars = async () => {
  const cigarCollection  = await firestore().collection('cigars').get();
  const cigarData = cigarCollection.docs[0]._data;
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
    height: '100%',
    width: screenWidth,
  },
});
/*
const cigars = [
  {
    id: '1',
    name: 'Testisikari 1',
    image_link: 'https://www.cigar-club.com/wp-content/uploads/2017/03/Cigar-smoking.jpeg',
    origin: 'Kuuba',
    bought_from: 'Havanna-aitta',
    cost: 15.80,
    added: '14.3.2025',
    rating: null,
    reviews: [],
  },
  {
    id: '2',
    name: 'Testisikari 2',
    image_link: '',
    origin: 'Nicaragua',
    bought_from: 'Töölön sikarikauppa',
    cost: 16.90,
    added: '3.5.2023',
    rating: 5,
    reviews: [
      {
        reviewer: 'testaaja 1',
        date: '12.6.2025',
        stars: null,
        review: 'Poikkeuksellisen hyvä! Suosittelen ehdottomasti. lorem ipsum jfljqjfnkwqjnegkj wnegkjnwkejgfnkjw engjwnegkjnwkgnj s.dfkgldflkwm dlkgmlwkmglkwg lkmwqlkgm lkwqmglköwmglk mwlkgmnlwkqgnlkw qmnglkwglkn wqlgnwrlkwjn',
      },
      {
        reviewer: 'testaaja 2',
        date: '4.3.2020',
        stars: 5,
        review: 'Yksi parhaista!',
      },
      {
        reviewer: 'testaaja 3',
        date: '4.4.2020',
        stars: 5,
        review: 'Herkkua!',
      },
      {
        reviewer: 'testaaja 4',
        date: '5.3.2020',
        stars: 5,
        review: 'Oho!',
      },
    ],
  },

];
*/
const ItemSeparator = () => <View style={styles.separator} />;

const CigarList = () => {
  const [cigars, setCigars] = useState([])

  useEffect(() => {
    const cigarsList = async () => {
      const fetchedCigars = await getCigars();
      setCigars([].concat(fetchedCigars));
    };
    cigarsList();
  }, []);
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.text}>
        <FlatList
          data={cigars}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <CigarItem item={item}
          style={{width: screenWidth}}/> }
        />
      </Text>
    </View>
  );
};

export default CigarList;
