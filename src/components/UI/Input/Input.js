import React from 'react';
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;

    let inputError = null;
    if(props.invalid && props.touched){
    inputError = <p>Please enter a correct {props.label}</p>
    }

    const inputClasses = ["d-md-flex mb-2 w-100"]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value}  onChange={props.change}/>
            break;

        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
            {...props.elementConfig} value={props.value} onChange={props.change}/>
            break;

        case('select'):
            inputElement = <select className={inputClasses.join(' ')}
             value={props.value} onChange={props.change}> 
             {props.elementConfig.options.map( option=>(
                 <option value={option.value} key={option.value}>{option.displayValue}</option>
             ))}
             </select>
            break;

        default: 
            inputElement = <input className={inputClasses.join(' ')}
            {...props.elementConfig} value={props.value} onChange={props.change}/>
    }

    return(
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label} </label>
        {inputElement}
        {inputError}
    </div>
)};

export default input;