import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2022-12-19')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2025-09-06')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-12-16')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-12-15')
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-12-14')
  },
  {
    id: 'e6',
    description: 'A pair of socks',
    amount: 3.99,
    date: new Date('2022-12-13')
  },
  {
    id: 'e7',
    description: 'A pair of shoes',
    amount: 69.99,
    date: new Date('2022-12-19')
  },
  {
    id: 'e8',
    description: 'A pair of trousers',
    amount: 99.29,
    date: new Date('2022-12-17')
  },
  {
    id: 'e9',
    description: 'Some bananas',
    amount: 6.99,
    date: new Date('2022-12-16')
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 15.99,
    date: new Date('2025-09-08')
  },
  {
    id: 'e11',
    description: 'Another book',
    amount: 19.59,
    date: new Date('2022-12-14')
  },
  {
    id: 'e12',
    description: 'A pair of socks',
    amount: 4.99,
    date: new Date('2022-12-13')
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});


const expensesReducer = (state, action) => {
  switch(action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];

    case 'SET':
      return action.payload.reverse();

    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}; 

const ExpensesContextProvider = ({children}) => {
   
  const [ expensesState, dispatch ] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
};

export default ExpensesContextProvider;