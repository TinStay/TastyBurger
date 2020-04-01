import React, {PureComponent} from "react";
import Input from '../../components/UI/Input/Input';
import {Button } from 'react-bootstrap';

// Redux store
import * as actions from '../../store/actions/index';
import {connect } from 'react-redux';

class Auth extends PureComponent{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email address',
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                toched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 8
                },
                valid: false,
                toched: false
            }
        }
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

    inputChangeHandler = (e, controlName) => {
        // Update control inputs
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }


        this.setState({
            controls: updatedControls
        })
    }

    submitHandler = e => {
        e.preventDefault();
        const emailValue = this.state.controls.email.value
        const passwordValue = this.state.controls.password.value

        this.props.onAuth(emailValue, passwordValue);
    }


    render(){
        const formElementsArray = []

        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
                })
        }
        const form = formElementsArray.map(formElement =>(
            <Input 
            key={formElement.id}
            shouldValidate = {formElement.config.validation}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
            change={(e) => this.inputChangeHandler(e, formElement.id)} />
           
        ) )
        return(
            <div className="container">
                
                <form className="border p-4" onSubmit={this.submitHandler} action="">
                <h1>Login</h1>
                {form}
                <Button type="submit" variant="success">Submit</Button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email,password) => dispatch(actions.auth(email,password))
    }
}

export default connect(null, mapDispatchToProps)(Auth);