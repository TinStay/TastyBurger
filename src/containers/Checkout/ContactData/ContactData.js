import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';


class ContactData extends Component{
    state={
        orderForm:{
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name',
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    toched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street',
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    toched: false

                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP Code',
                    },
                    value: '',
                    validation:{
                        required: true,
                        minLength: 4
                    },
                    valid: false,
                    toched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your country',
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    toched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email',
                    },
                    value: '',
                    validation:{
                        required: true
                    },
                    valid: false,
                    toched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                        { value: "normal", displayValue: 'Normal' },
                        { value: "fastest", displayValue: 'Fastest' },
                        ]},
                    value: 'normal',
                    valid: true,
                    touched: false,
                    validation: {}
                }
        },
        formIsValid: false
    };

    orderHandler = (e) => {
        e.preventDefault()
        // Switch the info of modal to a spinner

        const formData= {};

        // formData = { name: Margot, email: ... }
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        // Passing to the dispatchToProps
        this.props.onOrderBurger(order, this.props.token);

        
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid

    }

    inputChangeHandler = (e, inputIdentifier) => {
        // Clone OrderForm from state
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        // Clone child objects 
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier] 
        };
        // Change the value and validity of input
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        // Set this to true if the user has typed something
        updatedFormElement.touched = true;

        // Update OrderForm and set the state
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // Check if the whole form is valid
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }


        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }


    render(){
        const formElementsArray = []

        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
                })
        }
        // console.log(formElementsArray)

        let form = (
            <form onSubmit={this.orderHandler} action="">

                {formElementsArray.map(formElement =>(
                    <Input label={formElement.id[0].toUpperCase() + formElement.id.slice(1)}
                    key={formElement.id}
                    shouldValidate = {formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
                    change={(e) => this.inputChangeHandler(e, formElement.id)} />
                ))}

                <Button onClick={this.orderHandler} disabled={!this.state.formIsValid} variant='success'>Order</Button>
            </form>
            );

        if(this.props.loading){
            form = <Spinner />
        }
        
        return(
            <div className=' container mt-4 justify-content-center'>
                <div className='border my-4  col-md-8 offset-md-2 p-4 '>
                <h4>Enter your contact data</h4>
                 
                {form}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token

    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));