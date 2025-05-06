import { TextInput, Pressable, View, StyleSheet, Text, Alert } from 'react-native';
import { useFormik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';

const initialValues = {
  name: '',
};


const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Syötä nimi'),
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
});


const InputFields = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <View style = {styles.inputBox}>
        <TextInput
          placeholder = "Nimi"
          value = {formik.values.name}
          onChangeText = {formik.handleChange('name')}
          style = {[styles.input,
            {borderColor: formik.errors.name ? '#d73a4a' : theme.colors.secondary},
          ]}

        />
        {formik.touched.name && formik.errors.name && (
          <Text style={ styles.error }>{formik.errors.name}</Text>
        )}
      </View>

      <View style = {styles.flexContainer}>
        <Pressable onPress={formik.handleSubmit}>
          <Text style = {styles.text}>Lisää sikari</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values.name)
    Alert.alert(`User created successfully! The username is '${values.name}'`);
  };
  return (
    <InputFields onSubmit={onSubmit} />
  )
}

export default SignIn;