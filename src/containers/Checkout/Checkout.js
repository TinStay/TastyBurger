import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component{
    CheckoutCancel = ()=> {
        this.props.history.goBack();
    }

    CheckoutContinue = ()=> {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                CheckoutCancel={this.CheckoutCancel}
                CheckoutContinue={this.CheckoutContinue}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);