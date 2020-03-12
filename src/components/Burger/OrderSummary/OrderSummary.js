import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import classes from './OrderSummary.module.css';


class OrderSummary extends Component{

    componentDidUpdate(){
        console.log("[OrderSummary] DidUpdate");
    }
    
    render(){
        let igredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey+this.props.ingredients[igKey]}>{this.props.ingredients[igKey]}x <span style={{textTransform: 'capitalize'}}>{igKey}</span></li>
        })

        return(
        <div className={classes.OrderSummary}>
            <h2>Your Order</h2>
            <p>Your burger has the following ingredients:</p>
            <ul className={classes.List}>
                {igredientSummary}
            </ul>
            <h3>Total price: <strong>{this.props.price.toFixed(2)}$</strong></h3>
            <Button className={classes.Continue} onClick={this.props.continue}>Continue to Checkout</Button>
            <Button className={classes.Return} onClick={this.props.close}>Return</Button>
            {/* <p>Continue to checkout?</p> */}
        </div>)
    };
    }
    
;


export default OrderSummary;