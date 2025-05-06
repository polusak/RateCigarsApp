import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import theme from '../theme';
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width;
//const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.primary,
  },
  flexContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  flexContainerColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexContainerReview: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  text: {
    color: theme.colors.textPrimary,
  },
  reviewText: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textPrimary,
  },
  boldText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
  },
  boldText2: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    borderRadius: 5,
    backgroundColor: theme.colors.tertiary,
    color: theme.colors.textPrimary,
  },
  fullScreen: {
    paddingLeft: 10,
    fontSize: theme.fontSizes.subheading,
    borderWidth: 2,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textPrimary,
  },
  fullScreenBold: {
    paddingLeft: 10,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    borderWidth: 2,
    borderColor: theme.colors.tertiary,
    borderRadius: 5,
    backgroundColor: theme.colors.tertiary,
    color: theme.colors.textPrimary,
  },
});


const ReviewItem = ({item}) => {
  const [fullScreen, setfullScreen] = useState(false);

  const handleReviewPress = () => {
    setfullScreen(true);
  };
  const handleFullScreenPress = () => {
    setfullScreen(false);
  };


  if (fullScreen) {
    return (
      <Pressable onPress={handleFullScreenPress} style={{width: screenWidth / 1.06}}>
        <Text style={styles.fullScreenBold}>{'Arvostelu: '}</Text>
        <Text style={styles.fullScreen}>{`${item.review}`}</Text>
      </Pressable>
    );
  }
  return (
    <View>
      <View style={styles.flexContainerColumn}>
        {( item.review !== null && item.review !== undefined && item.review !== '' ) &&
        <View style={styles.flexContainerReview}>
          <Pressable onPress={handleReviewPress}>
            <Text style={styles.boldText2}>{'Arvostelu'}</Text>
          </Pressable>
        </View>}
        <View style={styles.flexContainerRow}>
          <Text style={styles.boldText}>{'Arvostelija: '}</Text>
          <Text style={styles.text}>{`${item.reviewer}`}</Text>
        </View>
        <View style={styles.flexContainerRow}>
          <Text style={styles.boldText}>{'Päivämäärä: '}</Text>
          <Text style={styles.text}>{`${item.date}`}</Text>
        </View>
        {( item.stars !== null &&
        item.stars !== undefined ) &&
        <View style={styles.flexContainerRow}>
          <Text style={styles.boldText}>{'Tähdet: '}</Text>
          <Text style={styles.text}>{`${item.stars}`}</Text>
        </View>}
        </View>
    </View>
  );
};

export default ReviewItem;
