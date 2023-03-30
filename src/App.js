import logo from './logo.svg';
import { useRef, useState } from 'react';
import './Expense.css';
import AvailableExpenses from './Components/AvailableExpenses'
import AvailableCharts from './Components/AvailableChart'
import ExpenseItem from './Components/ExpenseItem'



function App() {
const [isSearch, setIsSearch] = useState(false);
const isEmpty = (value) => value.trim() === '';
const [month,setMonth] = useState('')
const [year,setYear] = useState('')
const loadedExpenses = [];


  const [formInputsValidity, setFormInputsValidity] = useState({
    Month: true,
    Year: true,
    Day: true,
    Description: true,
    Amount: true,
  });

  
  const monthInputRef = useRef();
  const yearInputRef = useRef();
  const dayInputRef = useRef();
  const descriptionInputRef = useRef();
  const amountInputRef = useRef();
  const searchMonth = useRef();
  const searchYear = useRef();
  
  


  const confirmHandler = (event,expense) => {
    event.preventDefault();

    const enteredMonth = monthInputRef.current.value;
    const enteredYear = yearInputRef.current.value;
    const enteredDay = dayInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAmount= amountInputRef.current.value;

    const enteredMonthIsValid = !isEmpty(enteredMonth);
    const enteredYearIsValid = !isEmpty(enteredYear);
    const enteredDayIsValid = !isEmpty(enteredDay);
    const enteredDescriptionIsValid = !isEmpty(enteredDescription);
    const enteredAmountIsValid = !isEmpty(enteredAmount);

    setFormInputsValidity({
      Month: enteredMonthIsValid,
      Year: enteredYearIsValid,
      Day: enteredDayIsValid,
      Description: enteredDescriptionIsValid,
      Amount: enteredAmountIsValid,
    });

    const formIsValid =
      enteredMonthIsValid &&
      enteredYearIsValid &&
      enteredDayIsValid &&
      enteredAmountIsValid &&
      enteredDescriptionIsValid;
    
    if (!formIsValid) {
      console.log("hello")
      return;
    }

    
      const loadedExpenses = {
        Description: enteredDescription,
        Year: enteredYear,
        Amount: enteredAmount,
        Day: enteredDay,
        Month: enteredMonth,
      }

      console.log(loadedExpenses)
  

      fetch('https://expense-e9126-default-rtdb.firebaseio.com/expense.json', {
        method: 'POST',
        body: JSON.stringify({
          Month: loadedExpenses.Month,
          Day: loadedExpenses.Day,
          Description: loadedExpenses.Description,
          Year: loadedExpenses.Year,
          Amount: loadedExpenses.Amount
    
        })
      });
    
      monthInputRef.current.value = '';
      yearInputRef.current.value = '';
      dayInputRef.current.value = '';
      descriptionInputRef.current.value= '';
      amountInputRef.current.value= '';
  };

 
  const searchExpenses = () => {
    

    const enteredMonth = searchMonth.current.value;
    const enteredYear = searchYear.current.value;
 

    const enteredMonthIsValid = !isEmpty(enteredMonth);
    const enteredYearIsValid = !isEmpty(enteredYear);

    setMonth(enteredMonth)
    setYear(parseInt(enteredYear))

  
    if(!isEmpty(enteredMonth) && isEmpty(enteredYear)){
      setYear(enteredYear)
      setIsSearch(true)
    }
    if(!isEmpty(enteredYear)){
      setIsSearch(true)
    }

    if(isEmpty(enteredMonth) && isEmpty(enteredYear)){
      setIsSearch(false)
      console.log("hello2")
    }

    searchMonth.current.value = '';
    searchYear.current.value = '';


  };
  

  return (
    
    <div className="desktop1-container">
      <div className="desktop1-desktop1">
        <span className="desktop1-text">Expenses</span>
        <form onSubmit={confirmHandler}>
        <input className="desktop1-rectangle1" type="text" placeholder="Description" ref={descriptionInputRef} />
        <select className="desktop1-rectangle2" defaultValue="" ref={monthInputRef}>
          <option value="" disabled>  Choose a Month ... </option>
          <option value="January">January</option>
          <option value="Feburuary">Feburuary</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <input className="desktop1-rectangle3" placeholder="Day" type="number"  min="1" max="31" ref={dayInputRef}></input>
        <input className="desktop1-rectangle5" placeholder="Amount" type="number"  min="1" ref={amountInputRef}></input>
        <input className="desktop1-rectangle4" placeholder="Year" type="number" ref={yearInputRef}></input>
        <button type='submit' className="desktop1-svg" > Add </button>
        </form>
  
        <select className="desktop1-rectangle6" defaultValue="" ref ={searchMonth}>
          <option value="" disabled>  Choose a Month ... </option>
          <option value="January">January</option>
          <option value="Feburuary">Feburuary</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        
        <input className="desktop1-rectangle7"placeholder="Year" type="number" ref={searchYear}></input>
        
        
        <button className="desktop1-svg1" onClick={searchExpenses}>Search</button>
        <div className = "desktop1-svg2"></div>
        <span className="desktop1-text1">Search Expenses </span>
        <div className='list-container'>
          {isSearch ?  <AvailableCharts month = {month} year = {year}/> : <AvailableCharts month = {''} year = {''}/> } 
        </div>
        
      </div>
      {isSearch ?  <AvailableCharts month = {month} year = {year}/> : <AvailableCharts month = {''} year = {''}/> }
    </div>


    
      

  );
}



export default App;
