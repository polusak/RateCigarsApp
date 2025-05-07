import { TextInput, View, Text } from 'react-native';

const InputFieldForAdding = (params) => {
  const inputBoxStyle = params.constParams.inputBoxStyle;
  const inputStyle = params.constParams.inputStyle;
  const errorStyle = params.constParams.errorStyle;
  const formik = params.constParams.formik;
  const secondaryColor = params.constParams.secondaryColor;

  const fieldName = params.fieldName;
  const valueName = params.valueName;
  const formikValue = params.formikValue;

  return (
    <View style = {inputBoxStyle}>
        <TextInput
          placeholder = {`${fieldName}`}
          value = {formikValue}
          onChangeText = {formik.handleChange(`${valueName}`)}
          style = {[inputStyle,
            {borderColor: formik.errors.name ? '#d73a4a' : secondaryColor},
          ]}

        />
        {formik.touched.name && formik.errors.name && (
          <Text style={ errorStyle }>{formik.errors.name}</Text>
        )}
    </View>
  );
};

export default InputFieldForAdding;
