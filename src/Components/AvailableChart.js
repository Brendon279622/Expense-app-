import { useEffect, useState, useReducer } from 'react';
import ExpenseItem from './ExpenseItem';
import { PieChart, Pie} from 'react-chartjs-2';
import Chart  from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import '../Expense.css';



const AvailableCharts = ({month,year}) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const ExpenseListFilters = {};

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        'https://expense-e9126-default-rtdb.firebaseio.com/expense.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      // forceUpdate();

      const loadedExpenses = [];

      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          Description: responseData[key].Description,
          Year: responseData[key].Year,
          Amount: responseData[key].Amount,
          Day: responseData[key].Day,
          Month: responseData[key].Month,

        });
      }

      setExpenses(loadedExpenses);
      setIsLoading(false);
    };

    fetchExpenses().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  
  const source = {
    Month: {month}.month,
    Year: {year}.year,
  }

 

  var ExpenseList = {}
  var pairs = Object.entries(source);
  console.log(pairs)
 


  if(pairs[0][1]===pairs[1][1]){
     ExpenseList = expenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        Description={expense.Description}
        Year={expense.Year}
        Amount={expense.Amount}
        Day={expense.Day}
        Month={expense.Month}
      />
    ));
  }

  if(pairs[0][1]!=="" && pairs[1][1]!==""){
    
    const ExpenseListFilters =  expenses.filter(object => pairs.every(([key, value]) => object[key] === value))
    // expenses =  expenses.filter(object => pairs.every(([key, value]) => object[key] === value))
    ExpenseList = ExpenseListFilters.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        Description={expense.Description}
        Year={expense.Year}
        Amount={expense.Amount}
        Day={expense.Day}
        Month={expense.Month}
      />
    ));
    console.log(ExpenseList)

 }

 if(pairs[0][1]!=="" && pairs[1][1]===""){
    
  ExpenseListFilters = expenses.filter(element => { return element.Month === pairs[0][1];})
  // expenses =  expenses.filter(object => pairs.every(([key, value]) => object[key] === value))
  ExpenseList = ExpenseListFilters.map((expense) => (
    <ExpenseItem
      key={expense.id}
      id={expense.id}
      Description={expense.Description}
      Year={expense.Year}
      Amount={expense.Amount}
      Day={expense.Day}
      Month={expense.Month}
    />
  ));
  console.log(ExpenseListFilters)

}

if(pairs[0][1]==="" && pairs[1][1]!==""){
    
  ExpenseListFilters = expenses.filter(element => { return element.Year === pairs[1][1];})
  // expenses =  expenses.filter(object => pairs.every(([key, value]) => object[key] === value))
  ExpenseList = ExpenseListFilters.map((expense) => (
    <ExpenseItem
      key={expense.id}
      id={expense.id}
      Description={expense.Description}
      Year={expense.Year}
      Amount={expense.Amount}
      Day={expense.Day}
      Month={expense.Month}
    />
  ));
  console.log(ExpenseListFilters)

}



const holder = {};
console.log(ExpenseList)


expenses.forEach(function(d) {
  if (holder.hasOwnProperty(d.Description)) {
    holder[d.Description] = holder[d.Description] + d.Amount;
  } else {
    holder[d.Description] = d.Amount;
  }
});

console.log(holder);

const values = Object.values(holder)
const keys = Object.keys(holder)
console.log(keys)
console.log(values)

const state = {
    labels: keys,
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
        ],
        data: values
      }
    ]
  }


  return (
    <div>
    <Pie data={state}/>

    </div>
  

    
  );




};

export default AvailableCharts;

