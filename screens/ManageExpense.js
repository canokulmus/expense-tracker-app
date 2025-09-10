import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/style';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const ManageExpense = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const {
    deleteExpense: deleteExpenseCtx ,
    updateExpense: updateExpenseCtx, 
    addExpense: addExpenseCtx,
    expenses
  } = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;


  const selectedExpense = expenses.find((expense) => expense.id === editedExpenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing])

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);
      deleteExpenseCtx(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setIsSubmitting(false);
    }
  };
  
  const cancelHandler = () => {
    navigation.goBack();
  } 

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);

    try {
      if(isEditing){
        updateExpenseCtx(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
          const id = await storeExpense(expenseData);
          addExpenseCtx({ ...expenseData, id: id });
      }

      navigation.goBack();

    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if(error && !isSubmitting){
    return <ErrorOverlay message={error}/>
  }

  if(isSubmitting){
    return <LoadingOverlay />
  }

  return (
    <View style={styles.rootContainer}>
      <ExpenseForm 
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  }
});