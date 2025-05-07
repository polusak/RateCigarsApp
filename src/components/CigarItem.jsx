import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  Dimensions,
  Alert} from 'react-native';
import { useState } from 'react';
import ReviewItem from './ReviewItem';
import theme from '../theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.primary,
  },
  flexContainerRow: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
  },
  flexContainerLastRow: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  flexContainerColumn: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainerImage: {
    width: screenWidth,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    width: 100,
    height: 100,
  },
  fullScreenImage: {
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    width: screenWidth,
    height: screenHeight,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading
  },
  deleteButton: {
    color: theme.colors.textPrimary,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 5,
  },
  boldText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  boldReview: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingBottom: 10,
  },
  textBlock: {
    width: screenWidth,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: theme.fontSizes.subheading,
  },
});

const checkImageValidity = (url) => {
  const a = url;
  const b = ['jpeg','jpg','png'];
  const c = a.split('.');

  return(b.includes(c[c.length - 1]));
};

const ItemSeparator = () => <View style={styles.separator} />;

const CigarItem = ({item}) => {
  const [fullScreen, setfullScreen] = useState(false);

  const handleImagePress = () => {
    setfullScreen(true);
  };
  const handleFullScreenImagePress = () => {
    setfullScreen(false);
  };

  const handleDelete = (item) => {
    try {

    } catch (error) {
      Alert.alert('Sikarin poistaminen epäonnistui.');
      console.log(error);
    }
  };

  if (fullScreen) {
    return (
      <Pressable
        onPress={handleFullScreenImagePress}
      >
        <Image source={{uri: item.url}}
          style={styles.fullScreenImage} />
      </Pressable>
    );
  }

  return (

    <Text style={styles.textBlock}>
      <View style={styles.flexContainerColumn}>
        {(item.url !== '' &&
          item.url !== undefined &&
          item.url !== null &&
          checkImageValidity(item.url)
          ) && <View style={styles.flexContainerImage }>
          <Pressable
            onPress={handleImagePress}
          >
            <Image source={{uri: item.url}}
            style={styles.image} />
          </Pressable>
        </View>}
        <View style={styles.flexContainerRow}>
          <Text
            style={styles.boldText}
          >{'Nimi: '}</Text>
          <Text style={styles.text}>{`${item.name}`}</Text>
        </View>
        {(item.origin !== '' &&
          item.origin !== undefined &&
          item.origin !== null
          ) && <View style={styles.flexContainerRow }>
            <Text
              style={styles.boldText}
            >{'Alkuperä: '}</Text>
            <Text style={styles.text}>{`${item.origin}`}</Text>
        </View>}
        <View style={styles.flexContainerRow}>
          <Text
            style={styles.boldText}
          >{'Ostopaikka: '}</Text>
          <Text style={styles.text}>{`${item.bought_from}`}</Text>
        </View>
        <View style={styles.flexContainerRow}>
          <Text
            style={styles.boldText}
          >{'Hinta: '}</Text>
          <Text style={styles.text}>{`${item.price}€`}</Text>
        </View>
        <View>
          {(item.rating !== null &&
            item.rating !== undefined ) &&
          <View style={styles.flexContainerRow}>
            <Text
              style={styles.boldText}
            >{'Tähdet: '}</Text>
            <Text style={styles.text}>{`${item.rating}`}</Text>
        </View>}
        </View>
        <View style={styles.flexContainerLastRow}>
          <Text
            style={styles.boldText}
          >{'Lisätty '}</Text>
          <Text style={styles.text}>{`${item.added}`}</Text>
        </View>
        <View>
          {(
            item.reviews !== null &&
            item.reviews !== undefined &&
            item.reviews.length !== 0 ) &&
            <View style={styles.flexContainerColumn}>
              <Text
                style={styles.boldReview}
              >{'Arvostelut: '}</Text>
              <FlatList
                data={item.reviews}
                ItemSeparatorComponent={ItemSeparator}
                // eslint-disable-next-line no-shadow
                renderItem={({ item }) => <ReviewItem item={item} /> }
                style={{ paddingBottom: 10, height: screenHeight }}
              />
            </View>}
        </View>
          <Pressable onPress={() => handleDelete(item)}>
            <Text style = {styles.deleteButton}>Poista sikari</Text>
          </Pressable>
      </View>
          </Text>
  );
};

export default CigarItem;
