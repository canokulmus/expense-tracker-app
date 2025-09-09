import { View, Text, StyleSheet, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';


const renderExpenseItem = (itemData) => {
  return <ExpenseItem {...itemData.item} />;
};

const ExpensesList = ({expenses}) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});