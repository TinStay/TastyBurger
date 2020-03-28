import React, { Component } from 'react';
import Burger from '../../Burger/Burger'
import {Button} from 'react-bootstrap';
import classes from './CheckoutSummary.module.css'

const checkoutSummary= (props) => {

    return(
        <div className={classes.CheckoutSummary}>
            <h1>This is your burger.</h1>
            <h3> Would you like to continue the order.</h3>
            <h2>Price: {props.price}</h2>
                <Button className='mr-3 mt-4 btn-lg' onClick={props.CheckoutCancel}variant='danger'>Cancel</Button>
                <Button className='mr-3 mt-4 btn-lg' onClick={props.CheckoutContinue}variant='primary'>Continue</Button>
            <div style={{width: '100%',  margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
               
            </div>
        </div>
    )
}

export default checkoutSummary;