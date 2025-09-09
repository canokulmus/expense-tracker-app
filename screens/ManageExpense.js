import { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';

const ManageExpense = ({route, navigation}) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const {deleteExpense, updateExpense, addExpense } = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  
  const cancelHandler = () => {
    navigation.goBack();
  } 

  const confirmHandler = () => {
    if(isEditing){
      updateExpense(editedExpenseId, {amount: 29.99, date: new Date('2022-05-19'), description: 'Test Update!'});
    } else {
      addExpense({amount: 19.99, date: new Date(), description: 'Test!'});
    }

    navigation.goBack();
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttons}>
        <Button mode={'flat'} onPress={cancelHandler} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton 
            icon={'trash'} 
            color={GlobalStyles.colors.error500} 
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
      <Text>ManageExpense</Text>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
});