import {
  Pressable,
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
 } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import InputFieldForAdding from './InputFieldForAdding';
import firestore from '@react-native-firebase/firestore';

const initialValues = {
  name: '',
  url: '',
  origin: '',
  bought_from: '',
  price: '',
};

const screenWidth = Dimensions.get('window').width;
const today = new Date();
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Syötä nimi'),
  bought_from: yup
    .string()
    .required('Syötä ostopaikka'),
  price: yup
    .string()
    .required('Syötä hinta'),
});

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: theme.colors.textPrimary,
    color: theme.colors.secondary,
    borderWidth: 10,
    borderColor: theme.colors.primary,
    borderRadius: 3,
    padding: 5,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    color: theme.colors.textPrimary,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 5,
    borderColor: theme.colors.primary,
    borderRadius: 3,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  error: {
    color: '#d73a4a',
    backgroundColor: theme.colors.textPrimary,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 2,
  },
  main: {
    display: 'flex',
    height: '100%',
    width: screenWidth,
  },
});


const InputFields = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const constParams = {
    formik: formik,
    inputBoxStyle: styles.inputBox,
    inputStyle: styles.input,
    errorStyle: styles.error,
    secondaryColor: theme.colors.secondary,
  };

  return (
    <View style = {styles.main}>
      <InputFieldForAdding
        constParams = {constParams}
        formikValue = {formik.values.name}
        fieldName = {'Nimi'}
        valueName = {'name'}
      />
      <InputFieldForAdding
        constParams = {constParams}
        formikValue = {formik.values.url}
        fieldName = {'Kuvan url'}
        valueName = {'url'}
      />
      <InputFieldForAdding
        constParams = {constParams}
        formikValue = {formik.values.origin}
        fieldName = {'Alkuperä'}
        valueName = {'origin'}
      />
      <InputFieldForAdding
        constParams = {constParams}
        formikValue = {formik.values.bought_from}
        fieldName = {'Ostopaikka'}
        valueName = {'bought_from'}
      />
      <InputFieldForAdding
        constParams = {constParams}
        formikValue = {formik.values.price}
        fieldName = {'Hinta'}
        valueName = {'price'}
      />
      <View style = {styles.flexContainer}>
        <Pressable onPress={formik.handleSubmit}>
          <Text style = {styles.text}>Lisää sikari</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = async (values, {resetForm}) => {
    try {
      await firestore().collection('cigars').add({
        name: values.name,
        origin: values.origin,
        bought_from: values.bought_from,
        price: values.price,
        url: values.url,
        added: `${today.getDay()}.${today.getMonth()}.${today.getFullYear()}`,
      });
      Alert.alert(`Uusi sikari lisätty! Sikarin nimi: '${values.name}'.`);
    } catch (error) {
      Alert.alert('Uuden sikarin lisääminen epäonnistui.');
      console.log(error);
    }
    resetForm();
  };
  return (
    <InputFields onSubmit={onSubmit} />
  );
};

export default SignIn;
