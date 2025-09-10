import { View, StyleSheet, Text, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/style';

const ExpenseForm = ({onCancel, onSubmit, submitButtonLabel, defaultValues}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true
    },
    description: {
      value:  defaultValues ? defaultValues.description : '',
      isValid: true
    }
  });

  const inputChangeHandler = (inputIdentifier ,enteredValue) => {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true }
      }
    });
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      setInputs((curInputs) => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {value: curInputs.description.value, isValid: descriptionIsValid},
        }
      });

      return;
    }

    onSubmit(expenseData);
  };


  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input 
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          label={'Amount'} 
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />

        <Input
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          label={'Date'} 
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>

      <Input 
        invalid={!inputs.description.isValid}
        label={'Description'} 
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'sentences',
          // autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />

      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text> }
      <View style={styles.buttons}>
        <Button mode={'flat'} onPress={onCancel} style={styles.button}>Cancel</Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    minWidth: 120,
    marginHorizontal: 8,
  },
});