import { View, Text, StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

const AllExpenses = () => {

  const {expenses} = useContext(ExpensesContext);

  return (
   <ExpensesOutput 
    expenses={expenses} 
    expensesPeriod={'Total'}
    fallbackText={'No expenses registered.'}
   />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});