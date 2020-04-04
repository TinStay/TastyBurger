import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        let summary = <Redirect to='/' />
        

        if(this.props.ings){
            const orderedRedirect = this.props.ordered ? <Redirect to="/"/> : null;
            summary =<div>
                {orderedRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                CheckoutCancel={this.CheckoutCancel}
                CheckoutContinue={this.CheckoutContinue}/>
                <Route path={this.props.match.path + '/contact-data'} 
                component={ContactData}/>
            </div>
        }
        return(
            <div>
                {summary}
                
            </div>
        )
    }
}


const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice.toFixed(2),
        ordered: state.order.ordered
    }
}

export default connect(mapStateToProps)(Checkout);