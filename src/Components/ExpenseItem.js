import { useContext } from 'react';
import '../Expense.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter,faInstagram,faInstagramSquare,faGoogle } from '@fortawesome/free-brands-svg-icons';


const ExpenseItem = (props) => {

  return (
   
   <li >
        <div className="cellContainer">{props.Description}</div>
        <div className="cellContainer" >{props.Month}</div>
        <div className="cellContainer" >{props.Day}</div>
        <div className="cellContainer">{props.Year}</div>
        <div className="cellContainer" >{props.Amount}</div>
    </li>
    
  );
};

export default ExpenseItem;